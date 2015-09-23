var express = require('express');
var hairCtrl = require('../controllers/hairstyle.controller');
var saloonCtrl = require('../controllers/saloon.controller');
var userCtrl = require('../controllers/user.controller');
var router = express.Router();

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

router.route('/saloons')
  //request for posting Saloon
  .post(saloonCtrl.createSaloon);


//request operations on a single saloon
router.route('/saloons/:id')
  .get(saloonCtrl.getSaloon)
  .put(saloonCtrl.updateSaloon)
  .delete(saloonCtrl.deleteSaloon)

// signup
router.route('/signup')
  .post(userCtrl.signup);

// login
router.route('/login')
  .post(userCtrl.login);

// middleware
router.use(userCtrl.middleware);

// single user routes
router.route('/v1/users/:username')
  .get(userCtrl.getUser)
  .put(userCtrl.editProfile)
  .delete(userCtrl.deleteUser);

module.exports = router;
