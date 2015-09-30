var express = require('express');
var hairCtrl = require('../controllers/hairstyle.controller');
var saloonCtrl = require('../controllers/saloon.controller');
var authCtrl = require('../controllers/auth.controller');
var router = express.Router();
var passport = require('passport');

router.route('/hairstyles')
  //request for all hairstyles, updating the gallery
  .get(hairCtrl.getAllHairStyles)

//request for new hair creation
.post(hairCtrl.createHairStyle);

//requests for single hairstyle
router.route('/hairstyles/:id')
  .get(hairCtrl.getById)
  .put(hairCtrl.updateHairStyle)
  .delete(hairCtrl.removeHairStyle);

// facebook login route
router.route('/auth/facebook')
  .get(passport.authenticate('facebook', {
    scope: ['email']
}));

// facebook callback route
router.route('/auth/facebook/callback')
  .get(authCtrl.facebookLogin('facebook'));

router.route('/saloons')
  //request for posting Saloon
  .post(saloonCtrl.createSaloon);

//request operations on a single saloon
router.route('/saloons/:id')
  .get(saloonCtrl.getSaloon)
  .put(saloonCtrl.updateSaloon)
  .delete(saloonCtrl.deleteSaloon);

// signup
router.route('/signup')
  .post(authCtrl.signup);

// login
router.route('/login')
  .post(authCtrl.login);

// middleware
router.use(authCtrl.middleware);

// single user routes
router.route('/v1/users/:username')
  .get(authCtrl.getUser)
  .put(authCtrl.editProfile)
  .delete(authCtrl.deleteUser);

module.exports = router;
