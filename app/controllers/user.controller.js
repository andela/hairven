var jwt = require('jsonwebtoken');
var User = require('../models/user');
var db = require('../../config/config');


exports.signup = function(req, res) { 
  var user = new User();
  user.username = req.body.username; 
  user.email = req.body.email;
  user.password = req.body.password;

  user.save(function(err) {
    if (err) 
    {
      if (err.code == 11000)
      {
        return res.json({ success: false, message: 'Username already exists.'});
      }
      else
      {
          res.send(err);
      }
    }
    else
    {
    res.json({ message: 'User created!' });
    }
  }); 
};

exports.login = function(req, res) {
  User.findOne({
    username: req.body.username}).select('username email password').exec(function(err, user) {
    if (err) throw err;
    if (!user) 
    {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } 
    else if (user) 
    {
      var validPassword = user.comparePassword(req.body.password);
      if (!validPassword) 
      {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } 
      else 
      {
        var token = jwt.sign(user, db.secret, {
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

exports.middleware = function(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) 
  {
    jwt.verify(token, db.secret, function(err, decoded) {      
      if (err) 
      {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } 
      else 
      {
        req.decoded = decoded;    
        next();
      }
    });

  } 
  else 
  {
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    }); 
  }
};


exports.home = function(req, res) {
  res.json({ message: 'API' });
};

exports.users = function(req, res) {
  User.find(function(err, users) {
    res.json(users);
  });
};

exports.getUser = function(req, res) { 
  User.findById(req.params.user_id, function(err, user) { 
    if (err) 
    {
      res.send(err);
    }
    res.json(user);
    }); 
};

exports.editProfile = function(req, res) {
  User.findById(req.params.user_id, function(err, user) { 
    if (err) 
    {
      res.send(err);
    }

    if (req.body.username)
    {
      user.username = req.body.username;
    }
    if (req.body.email) 
    {
      user.email = req.body.email; 
    }
    if (req.body.password) 
    {
      user.password = req.body.password;
    }

    user.save(function(err) {
    if (err) 
    {
      res.send(err);
    }
    });

    res.json({ message: 'User updated!' });
  }); 
};

exports.deleteUser = function(req, res) {
  User.remove({_id: req.params.user_id}, 
    function(err) {
    if (err) 
    {
      return res.send(err);                   
    }
    res.json({ message: 'Successfully deleted' });
  }); 
};
