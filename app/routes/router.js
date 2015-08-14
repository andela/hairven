var express = require('express');
var router = express.Router();
var ctrl = require('../controllers/user.controller');

// signup
router.route('/signup')
  .post(ctrl.signup);

// login
router.route('/login')
  .post(ctrl.login);

// middleware
router.use(ctrl.middleware); 

// single user routes
router.route('/v1/users/:username')
  .get(ctrl.getUser)
  .put(ctrl.editProfile)
  .delete(ctrl.deleteUser);

module.exports = router;