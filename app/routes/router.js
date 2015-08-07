var express = require('express');
var router = express.Router();
var ctrl = require('../controllers/user.controller');

// signup
router.route('/signup')
  .post(ctrl.signup);

// login
router.route('/login')
  .post(ctrl.login);

router.use(ctrl.middleware);

// localhost/api
router.route('/')
  .get(ctrl.home); 

// route to return all users 
router.route('/users')
  .get(ctrl.users);  

router.route('/users/:user_id')
  .get(ctrl.getUser)
  .put(ctrl.editProfile)
  .delete(ctrl.deleteUser);

module.exports = router;