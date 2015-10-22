var authCtrl = require('../controllers/auth.controller');
var passport = require('passport');

function authRoutes(router) {

  // facebook login route
  router.route('/auth/facebook/')
    .post(authCtrl.facebookSignin);

 // twitter login route
  router.route('/auth/twitter/')
    .post(authCtrl.twitterSignin);

  // signup
  router.route('/signup')
    .post(authCtrl.signup);

  // login
  router.route('/login')
    .post(authCtrl.login);
}

module.exports = authRoutes;
