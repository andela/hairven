var authCtrl = require('../controllers/auth.controller');
var passport = require('passport');

function authRoutes(router) {

  // facebook login route
  router.route('/auth/facebook')
    .get(passport.authenticate('facebook', {
      scope: ['email']
  }));

  // facebook callback route
  router.route('/auth/facebook/callback')
    .get(authCtrl.facebookLogin('facebook'));

  // twitter login route
  router.route('/auth/twitter')
    .get(passport.authenticate('twitter'));

  // twitter callback route
  router.route('/auth/twitter/callback')
    .get(authCtrl.twitterLogin('twitter'));

  // signup
  router.route('/signup')
    .post(authCtrl.signup);

  // login
  router.route('/login')
    .post(authCtrl.login);
}

module.exports = authRoutes;
