'use strict';
let mongoose = require('mongoose');

const User = mongoose.model('User');

exports.getAll = function (req, res) {
  User.find({}, function (err, users) {
      if (err)
        res.send(err);
      res.status(200).json(users);
  })
};

exports.post = function (req, res) {
    let usr = new User(req.body);
    usr.save(function (err, user) {
        if(err)
          res.send(err);
        res.status(201).json(user);
    })
};

exports.get = function (req, res) {
    User.findById(req.params.id, function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};

exports.put = function (req, res) {
    User.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, runValidators: true}, function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};

exports.delete = function (req, res) {
    User.remove({_id: req.params.id}, function(err, task) {
        if (err)
            res.send(err);
        res.json({message:"User deleted"});
    });
};


exports.login = function (req, res) {
    User.findOne({email:req.body.email, senha:req.body.senha},'name email status',function (err, user) {
        if(err) {
            res.send(err);
        }
        if(user){
            res.status(201).json(user);
        }else {
            res.status(401).json({message:"Bad Credentials"});
        }
    })
};