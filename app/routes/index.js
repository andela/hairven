var authRoutes = require('./auth.routes');
var hairstyleRoutes = require('./hairstyle.routes');
var salonRoutes = require('./salon.routes');
var userRoutes = require('./user.routes');

function routes(router) {
  authRoutes(router);
  hairstyleRoutes(router);
  salonRoutes(router);
  userRoutes(router);
}

module.exports = routes;