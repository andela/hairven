var searchCtrl = require('../controllers/search.controller');

function searchRoutes(router) {
  router.route('/search')
    .get(searchCtrl.search);
}

module.exports = searchRoutes;