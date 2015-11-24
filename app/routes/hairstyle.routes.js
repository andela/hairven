var hairCtrl = require('../controllers/hairstyle.controller');

function hairstyleRoutes(router) {

  //request for all hairstyles
  router.route('/hairstyles')
    .get(hairCtrl.getAllHairStyles)

  //request for new hair creation
  .post(hairCtrl.createHairStyle);

  //request for getting hairstyles of a particular salon
  router.route('/salons/:id/hairstyles')
    .get(hairCtrl.getSalonHairStyles);

  //requests for single hairstyle
  router.route('/hairstyles/:id')
    .get(hairCtrl.getById)
    .put(hairCtrl.updateHairStyle)
    .delete(hairCtrl.removeHairStyle);
}

module.exports = hairstyleRoutes;