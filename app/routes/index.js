var authRoutes = require('./auth.routes');
var hairstyleRoutes = require('./hairstyle.routes');
var saloonRoutes = require('./saloon.routes');
var userRoutes = require('./user.routes');

function routes(router) {
  authRoutes(router);
  hairstyleRoutes(router);
  saloonRoutes(router);
  userRoutes(router);
}

module.exports = routes;