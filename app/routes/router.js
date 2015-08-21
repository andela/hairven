var express = require('express');
var hairCntrl = require('../controllers/hairstyle.controller');
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

router.route('/hairstyles')
		//request for all hairstyles, updating the gallery
  .get(hairCntrl.getAllHairStyles)

  //request for new hair creation
  .post(hairCntrl.createHairStyle);

//requests for single hairstyle
router.route('/hairstyles/:name')
  .get(hairCntrl.getByName)
  .put(hairCntrl.updateHairStyle)
  .delete(hairCntrl.removeHairStyle);

module.exports = router;
