var salonCtrl = require('../controllers/salon.controller');

function salonRoutes(router) {

  //request for posting salon
  router.route('/salons')
    .post(salonCtrl.createSalon);

  //request operations on a single salon
  router.route('/salons/:id')
    .get(salonCtrl.getSalon)
    .put(salonCtrl.updateSalon)
    .delete(salonCtrl.deleteSalon);
}

module.exports = salonRoutes;