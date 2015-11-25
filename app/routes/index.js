var authRoutes = require('./auth.routes');
var hairstyleRoutes = require('./hairstyle.routes');
var salonRoutes = require('./salon.routes');
var userRoutes = require('./user.routes');
var searchRoutes = require('./search.routes');

function routes(router) {
  authRoutes(router);
  hairstyleRoutes(router);
  salonRoutes(router);
  userRoutes(router);
  searchRoutes(router);
}

module.exports = routes;