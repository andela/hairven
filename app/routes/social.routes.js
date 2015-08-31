var express = require('express');
var router = express.Router();
var sCtrl = require('../controllers/social.controller');

module.exports = function(app, passport) {
  router.route('/auth/facebook')
  .get(passport.authenticate('facebook', {
    scope: ["email"]
  }));

  // callback
  router.route('/auth/facebook/callback')
  .get(sCtrl.facebookLogin('facebook'));

  app.use('/', router);
};