var jwt = require('jsonwebtoken');
var User = require('../models/user.model');
var config = require('../../config/config');
var Salon = require('../models/salon.model');
var Hair = require('../models/hairstyle.model');

exports.authMiddleware = function(req, res, next) {
  var token = req.body.token ||
    req.query.token ||
    req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err) {
        return res.json({
          success: false,
          message: 'Failed to authenticate token.'
        });
      } else {

        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });
  }
};

exports.search = function(req, res) {
  var term = new RegExp(req.body.term, 'i');
  var results = [];
  Salon.find({$or:[{name:term}, {address:term}]}, function(err, salons) {
    if (err) {
      res.send({
        success: false,
        message: 'Ooops! An error occured.'
      });
    }
    results.push(salons);
    Hair.find({$or: [{name: term}, {description: term}]}, function(err, hairstyles) {
      if (err) {
        res.send({
          success: false,
          message: 'Ooops! An error occured.'
        });
      }
      results.push(hairstyles);
        res.json(results);
    });
  });
};

exports.getUser = function(req, res) {
  User.find({
    username: req.params.username
  }, function(err, user) {
    if (err) {
      res.send(err);
    }
    res.json(user);
  });
};

exports.editProfile = function(req, res) {
  User.update({
      username: req.params.username
    },
    req.body,
    function() {
      res.json({
        message: 'User updated!'
      });
    });
};

exports.deleteUser = function(req, res) {
  User.remove({
      username: req.params.username
    },
    function(err) {
      if (err) {
        return res.send(err);
      }
      res.json({
        message: 'Successfully deleted'
      });
    });
};
