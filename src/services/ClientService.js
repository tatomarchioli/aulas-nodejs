'use strict';
let mongoose = require('mongoose');

const Client = mongoose.model('Client');

exports.getAll = function (req, res) {
  Client.find({}, function (err, clients) {
      if (err)
        res.send(err);
      res.status(200).json(clients);
  })
};

exports.post = function (req, res) {
    let usr = new Client(req.body);
    usr.save(function (err, cliente) {
        if(err)
          res.send(err);
        res.status(201).json(cliente);
    })
};

exports.get = function (req, res) {
    Client.findById(req.params.id, function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};

exports.put = function (req, res) {
    Client.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, runValidators: true}, function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};

exports.delete = function (req, res) {
    Client.remove({_id: req.params.id}, function(err, task) {
        if (err)
            res.send(err);
        res.json({message:"Client deleted"});
    });
};