var jwt = require('jsonwebtoken');
var User = require('../models/user.model');
var config = require('../../config/config');

exports.middleware = function(req, res, next) {
  var token = req.body.token ||
    req.query.token ||
    req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err) {
        return res.json({ 
          success: false,
          message: 'Failed to authenticate token.' });
      }
      else {
        req.decoded = decoded;
        next();
      }
    });
  }
  else {
    return res.status(403).send({
        success: false,
        message: 'No token provided.'
    });
  }
};

exports.getUser = function(req, res) {
  User.find({username: req.params.username}, function(err, user) {
    if (err) {
      res.send(err);
    }
    res.json(user);
    });
};

exports.editProfile = function(req, res) {
  User.update({username: req.params.username},
    req.body, function() {
    res.json({ message: 'User updated!' });
  });
};

exports.deleteUser = function(req, res) {
  User.remove({username: req.params.username},
    function(err) {
    if (err) {
      return res.send(err);
    }
    res.json({ message: 'Successfully deleted' });
  });
};
