var passport = require('passport');
var User = require('../app/models/user.model');
var mongoose = require('mongoose');
var FacebookStrategy = require('passport-facebook').Strategy;
var configAuth = require('./auth');

module.exports = function(passport) {
  passport.use(new FacebookStrategy({
    clientID: configAuth.facebookAuth.clientID,
    clientSecret: configAuth.facebookAuth.clientSecret,
    callbackURL: configAuth.facebookAuth.callbackURL,
    profileFields: ["emails", "first_name"],
    enableProof: false
  },

  function(token, refreshToken, profile, done) {
    process.nextTick(function() {
      User.findOne({username: profile._json.first_name},
        function(err, user) {
          if (err) {
            return done(err);
          }
          else if (user) {
            return done(null, user);
          } 
          else {
            var generatePassword = function () {
              var passLength = 8;
              var alphaNum = "0123456789abcdefghijklnopqrstuvwxyz\
              ABCDEFGHIJKLMNOPQRSTUVWXYZ";
              var facebookPass = "";
              for (var i = 0; i < passLength; ++i) {
                facebookPass += alphaNum.charAt(Math.floor(
                  Math.random() * alphaNum.length));
              }
              return facebookPass;
            };
            var newUser = new User();
            newUser.username = profile._json.first_name;
            newUser.email = profile._json.email;
            newUser.password = generatePassword();

            newUser.save(function(err) {
            if (err) {
              return done(err);
            }
            else {
              return done(null, newUser);
            }
            });
          }
        });
      });
    }
  ));

};
