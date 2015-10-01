var passport = require('passport');
var User = require('../app/models/user.model');
var mongoose = require('mongoose');
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var configAuth = require('./auth');

// function to generate password
var generatePassword = function () {
  var passLength = 8;
  var alphaNum = '0123456789abcdefghijklnopqrstuvwxyz'+
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$^&%*()+=-[]{}|:<>?,.';
  var facebookPass = '';
  for (var i = 0; i < passLength; ++i) {
    facebookPass += alphaNum.charAt(Math.floor(
      Math.random() * alphaNum.length));
  }
  return facebookPass;
};

module.exports = function(passport) {

  // facebook authentication strategy
  passport.use(new FacebookStrategy({
    clientID: configAuth.facebookAuth.clientID,
    clientSecret: configAuth.facebookAuth.clientSecret,
    callbackURL: configAuth.facebookAuth.callbackURL,
    profileFields: ['emails', 'first_name'],
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
  
  // twitter authentication strategy
  passport.use(new TwitterStrategy({
    consumerKey: configAuth.twitterAuth.consumerKey,
    consumerSecret: configAuth.twitterAuth.consumerSecret,
    callbackURL: configAuth.twitterAuth.callbackURL
  },

  function(token, tokenSecret, profile, done) {
    process.nextTick(function() {
      User.findOne({username: profile._json.screen_name}, function(err, user) {
        if (err) {
          return done(err);
        }
        else if (user) {
          return done(null, user);
        } 
        else {
          var newUser = new User();
          newUser.username = profile._json.screen_name;
          newUser.email = profile._json.screen_name + '@gmail.com';
          newUser.password = generatePassword();

          newUser.save(function(err) {
            if (err) {
              throw err;
            } 
            else {
              return done(null, newUser);
            }
          });
        }
      });
    });
  }));

};
