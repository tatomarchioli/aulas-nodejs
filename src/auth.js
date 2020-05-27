let LocalStrategy = require('passport-local').Strategy;
let mongoose = require('mongoose');
let User = mongoose.model('User');

module.exports = function (passport) {

    function findUser(email, callback){
        User.findOne({email:email},'nome email status senha',function (err, user) {
            callback(err, user);
        });
    }

    function findUserById(id, callback){
        User.findOne({_id:id},'nome email status',function (err, user) {
            callback(err, user);
        });
    }

    passport.serializeUser(function(user, done){
        done(null,user._id);
    });

    passport.deserializeUser(function(id, done){
        findUserById(id, function(err,user){
            done(err, user);
        });
    });

    passport.use(new LocalStrategy({usernameField: 'email', passwordField: 'senha'}, (email, senha, done) => {
            findUser(email, (err, user) => {
                if (err) {
                    return done(err)
                }

                // usuário inexistente
                if (!user) {
                    return done(null, false)
                }

                user.comparePassword(senha, function(err, isValid) {
                    if (err) {
                        console.log(err);
                        return done(err)
                    }
                    if (!isValid) {
                        console.log({message:'invalid'});
                        return done(null, false)
                    }
                    console.log("Tudo ok");
                    return done(null, user)
                });
            });
        }
    ));
};
