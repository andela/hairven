var passport = require('passport');

exports.facebookLogin = function(strategy) {
  return function(req, res, next) {
    passport.authenticate(strategy, function(err, user) {
      if (err) {
        throw (err);
      }
      else if (!user) {
        return res.status(401).send({ 
        success: false,
        message: 'Authentication failed. User not found.' });
      }
      else {
        res.json({
        success: true,
        message: 'Welcome to Hairven'
        });
      }
    })(req, res, next);
  };
};