var jwt = require('jsonwebtoken');
var User = require('../models/user.model');
var config = require('../../config/config');
var auth = require('../../config/auth');
var request = require('request');
var qs = require('qs');
var validator = require('./validator');

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

//signup a new user
exports.signup = function(req, res) {

  var user = req.body;

  //validate provided details
  var check = validator.validate(user);
  if (typeof check === typeof [] && check.length > 0) {
    var messages = check.join(', ');
    res.status(401).send({
      success: false,
      message: messages
    });
  } else {
    newUser = new User(user)
    newUser.save(function(err) {
      if (err) {
        console.log(err);
        if (err.code === 11000) {
          return res.status(401).send({
            success: false,
            message: 'Username already exists!'
          });
        } else {
          return res.status(401).send(err);
        }
      } else {
        res.send({
          success: true,
          message: 'Account created!'
        });
      }
    });
  }
};

//login a user
exports.login = function(req, res) {
  User.findOne({
      username: req.body.username
    })
    .select('username password role salons')
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
            message: 'You are logged in',
            token: token,
            user: user
          });
        }
      }
    });
};

//sigin in auser via twitter
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
        if (req.headers['x-access-token']) {

          User.find({
            username: profile.screen_name
          }, function(err, user) {

            if (!user.username) {

              var names = profile.name.split(' ');

              //create a new user account
              var user = new User();
              user.username = profile.screen_name;
              user.email = user.username + 'unknown@unknown';
              user.name = {
                  first: names[0] || 'none',
                  last: names[1] || 'none'
                },
                user.role = 'user',
                user.password = generatePassword();

              user.save(function(err) {
                if (err) {
                  return err
                }
              });
            }
            res.status(200).send({
              success: true,
              token: jwt.sign(user, config.secret, {
                expiresInMinutes: 1440
              }),
              user: user
            });

          });

        } else {
          res.status(400).send({
            success: false,
            message: 'Hoops! Error, try again.'
          });

        }

      });

    });
  }
};

//signin a user via facebook
exports.facebookSignin = function(req, res) {

  var fields = ['id', 'email', 'first_name', 'last_name', 'name'];
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
      if (req.headers['x-access-token']) {

        var names = profile.name.split(' ');

        User.find({
          username: names[0]
        }, function(err, user) {

          if (!user.username) {

            //create a new user account
            var user = new User();
            user.username = names[0];
            user.email = user.username + 'unknown@unknown';
            user.name = {
                first: names[0],
                last: names[1]
              },
              user.role = 'user',
              user.password = generatePassword();

            user.save(function(err) {
              if (err) {
                console.log(err);
              }
            });
          }
          res.status(200).send({
            success: true,
            token: jwt.sign(user, config.secret, {
              expiresInMinutes: 1440
            }),
            user: user
          });

        });

      } else {
        res.status(400).send({
          success: false,
          message: 'Hoops! Error, try again.'
        });

      }
    });
  });
};
