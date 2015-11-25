var searchCtrl = require('../controllers/search.controller');

function searchRoutes(router) {
  router.route('/search')
    .post(searchCtrl.search);
}

module.exports = searchRoutes;