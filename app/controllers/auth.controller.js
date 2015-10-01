var jwt = require('jsonwebtoken');
var User = require('../models/user.model');
var config = require('../../config/config');
var passport = require('passport');

exports.signup = function(req, res) {
  var user = new User();
  user.username = req.body.username;
  user.email = req.body.email;
  user.password = req.body.password;

  user.save(function(err) {
    if (!user.username||!user.email||!user.password) {
      return res.status(401).send({
        success: false,
        message: 'Invalid Username or Email or Password!'});
    }
    else if (err) {
      if (err.code === 11000) {
        return res.status(401).send({
          success: false,
          message: 'Username already exists!'});
      }
      else {
          return res.status(401).send(err);
      }
    }
    else {
    res.json({ message: 'User created!' });
    }
  });
};

exports.facebookLogin = function(strategy) {
  return function(req, res, next) {
    passport.authenticate(strategy, function(err, user) {
      if (err) {
        throw (err);
      }
      else if (!user) {
        return res.status(401).send({ 
        success: false,
        message: 'Invalid Username or Password!' });
      }
      else {
        var token = jwt.sign(user, config.secret, {
          expiresInMinutes: 1440
        });
        res.json({
          success: true,
          message: 'Welcome to Hairven'
        });
      }
    })(req, res, next);
  };
};

exports.twitterLogin = function(strategy) {
  return function(req, res, next) {
    passport.authenticate(strategy, function(err, user) {
      if (err) {
        throw (err);
      }
      else if (!user) {
        return res.status(401).send({ 
        success: false,
        message: 'Invalid Username or Password!' });
      }
      else {
        var token = jwt.sign(user, config.secret, {
          expiresInMinutes: 1440 
        });
        res.json({
          success: true,
          message: 'Welcome to Hairven'
        });
      }
    })(req, res, next);
  };
};

exports.login = function(req, res) {
  User.findOne({
    username: req.body.username})
      .select('username password')
      .exec(function(err, user) {
    if (err) {
      throw err;
    }
    if (!user) {
      return res.status(401).send({
        success: false,
        message: 'Invalid Username or Password!' });
    }
    else {
      var validPassword = user.comparePassword(req.body.password);
      if (!validPassword) {
        return res.status(401).send({
          success: false,
          message: 'Invalid Username or Password!' });
      }
      else {
        var token = jwt.sign(user, config.secret, {
          expiresInMinutes: 1440
        });
        res.json({
          success: true,
          message: 'Token generated.',
          token: token
        });
      }
    }
  });
};
