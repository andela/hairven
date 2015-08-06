//var express = require('express');
var apiRoutes = express.Router(); 
var ctrl = require('./controllers/user.controller');


// signup
apiRoutes.route('/signup')
  .post(ctrl.signup);

// shopOwner signup
apiRoutes.route('/ssignup')
  .post(ctrl.shopOwnerSignup); 

// login
apiRoutes.route('/login')
  .post(ctrl.login);

// shopOwner login
apiRoutes.route('/slogin')
  .post(ctrl.shopOwnerLogin); 

apiRoutes.use(ctrl.middleware);

// localhost/api
apiRoutes.route('/')
  .get(ctrl.home); 

// route to return all users 
apiRoutes.route('/users')
  .get(ctrl.users);  

// route to return all shopOwners 
apiRoutes.route('/shopOwners')
  .get(ctrl.shopOwners);

apiRoutes.route('/users/:user_id')
  .get(ctrl.getUser)
  .put(ctrl.editProfile)
  .delete(ctrl.deleteUser);

apiRoutes.route('/shopOwners/:shopOwner_id')
  .get(ctrl.getShopOwner)
  .put(ctrl.editShopOwnerProfile)
  .delete(ctrl.deleteShopOwner);

module.exports = apiRoutes;
