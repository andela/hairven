var saloonCtrl = require('../controllers/saloon.controller');

function saloonRoutes(router) {

  //request for posting Saloon
  router.route('/saloons')
    .post(saloonCtrl.createSaloon);

  //request operations on a single saloon
  router.route('/saloons/:id')
    .get(saloonCtrl.getSaloon)
    .put(saloonCtrl.updateSaloon)
    .delete(saloonCtrl.deleteSaloon);
}

module.exports = saloonRoutes;