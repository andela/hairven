var authCtrl = require('../controllers/user.controller');

function authRoutes (router) {
  router.route('/v1/users/:username')
    .get(authCtrl.middleware, authCtrl.getUser)
    .put(authCtrl.middleware, authCtrl.editProfile)
    .delete(authCtrl.middleware, authCtrl.deleteUser);
}

module.exports = authRoutes;