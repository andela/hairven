var jwt = require('jsonwebtoken');
var User = require('../models/user.model');
var config = require('../../config/config');
var auth = require('../../config/auth');
var request = require('request');
var qs = require('qs');


// function to generate password
var generatePassword = function() {
  var passLength = 8;
  var alphaNum = '0123456789abcdefghijklnopqrstuvwxyz' +
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$^&%*()+=-[]{}|:<>?,.';
  var password = '';
  for (var i = 0; i < passLength; ++i) {
    password += alphaNum.charAt(Math.floor(
      Math.random() * alphaNum.length));
  }
  return password;
};

exports.signup = function(req, res) {
  var user = new User();
  user.username = req.body.username;
  user.email = req.body.email;
  user.password = req.body.password;

  user.save(function(err) {
    if (!user.username || !user.email || !user.password) {
      return res.status(401).send({
        success: false,
        message: 'Invalid Username or Email or Password!'
      });
    } else if (err) {
      if (err.code === 11000) {
        return res.status(401).send({
          success: false,
          message: 'Username already exists!'
        });
      } else {
        return res.status(401).send(err);
      }
    } else {
      res.json({
        message: 'User created!'
      });
    }
  });
};

exports.login = function(req, res) {

  User.findOne({
      username: req.body.username
    })
    .select('username password')
    .exec(function(err, user) {
      if (err) {
        throw err;
      }
      if (!user) {
        return res.status(401).send({
          success: false,
          message: 'Invalid Username or Password!'
        });
      } else {
        var validPassword = user.comparePassword(req.body.password);
        if (!validPassword) {
          return res.status(401).send({
            success: false,
            message: 'Invalid Username or Password!'
          });
        } else {
          var token = jwt.sign(user, config.secret, {
            expiresInMinutes: 1440
          });
          res.send({
            success: true,
            message: 'Token generated.',
            token: token
          });
        }
      }
    });
};


exports.twitterSignin = function(req, res) {

  var requestTokenUrl = 'https://api.twitter.com/oauth/request_token';
  var accessTokenUrl = 'https://api.twitter.com/oauth/access_token';
  var profileUrl = 'https://api.twitter.com/1.1/users/show.json?screen_name=';

  // Part 1 of 2: Initial request from Satellizer.
  if (!req.body.oauth_token || !req.body.oauth_verifier) {
    var requestTokenOauth = {
      consumer_key: auth.twitterAuth.consumerKey,
      consumer_secret: auth.twitterAuth.consumerSecret,
      callback: req.body.redirectUri
    };

    // Step 1. Obtain request token for the authorization popup.
    request.post({
      url: requestTokenUrl,
      oauth: requestTokenOauth
    }, function(err, response, body) {
      var oauthToken = qs.parse(body);

      // Step 2. Send OAuth token back to open the authorization screen.
      res.send(oauthToken);
    });
  } else {
    // Part 2 of 2: Second request after Authorize app is clicked.
    var accessTokenOauth = {
      consumer_key: auth.twitterAuth.consumerKey,
      consumer_secret: auth.twitterAuth.consumerSecret,
      token: req.body.oauth_token,
      verifier: req.body.oauth_verifier
    };

    // Step 3. Exchange oauth token and oauth verifier for access token.
    request.post({
      url: accessTokenUrl,
      oauth: accessTokenOauth
    }, function(err, response, accessToken) {

      accessToken = qs.parse(accessToken);

      var profileOauth = {
        consumer_key: auth.twitterAuth.consumerKey,
        consumer_secret: auth.twitterAuth.consumerSecret,
        oauth_token: accessToken.oauth_token
      };

      // Step 4. Retrieve profile information about the current user.
      request.get({
        url: profileUrl + accessToken.screen_name,
        oauth: profileOauth,
        json: true
      }, function(err, response, profile) {

        // Step 5a. Link user accounts.
        if (req.headers.authorization) {
          User.findOne({
            firstname: profile.firstname
          }, function(err, user) {
            if (!user) {
              return res.status(400).send({
                message: 'User not found'
              });
            } else {
              res.redirect('/');
            }
          });

        } else {
          //create a new user account
          var user = new User();
          user.email = profile.email;
          user.username = profile.name;
          user.password = generatePassword();

          user.save(function() {
            res.send({
              token: jwt.sign(user, config.secret, {
                expiresInMinutes: 1440
              })
            });
          });
        }
      });
    });
  }
};

exports.facebookSignin = function(req, res) {
  var accessTokenUrl = 'https://graph.facebook.com/v2.3/oauth/access_token';
  var graphApiUrl = 'https://graph.facebook.com/v2.3/me';

  var params = {
    code: req.body.code,
    client_id: req.body.clientId,
    client_secret: auth.facebookAuth.clientSecret,
    redirect_uri: req.body.redirectUri
  };

  // Exchange authorization code for access token.
  request.get({
    url: accessTokenUrl,
    qs: params,
    json: true
  }, function(err, response, accessToken) {
    if (response.statusCode !== 200) {
      return res.status(500).send({
        message: accessToken.error.message
      });
    }

    //Retrieve profile information about the current user.
    request.get({
      url: graphApiUrl,
      qs: accessToken,
      json: true
    }, function(err, response, profile) {
      if (response.statusCode !== 200) {
        return res.status(500).send({
          message: profile.error.message
        });
      }
      if (req.headers.authorization) {
        User.findOne({
          firstname: profile.firstname
        }, function(err, user) {
          if (!user) {
            return res.status(400).send({
              message: 'User not found'
            });
          } else {
            res.redirect('/');
          }
        });

      } else {
        // create new user

        var user = new User();
        user.email = profile.email;
        user.username = profile.name;
        user.password = generatePassword();

        user.save(function() {
          res.send({
            token: jwt.sign(user, config.secret, {
              expiresInMinutes: 1440
            })
          });
        });

      }

    });
  });
};
