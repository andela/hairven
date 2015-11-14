'use strict';

angular.module('hairvenApp')
  .controller('UserCtrl', ['UserService', 'SalonService', '$rootScope', '$window', '$scope',
    '$location', '$localStorage', '$auth', 'ngToast',
    function(UserService, SalonService, $rootScope, $window, $scope, $location, $localStorage, $auth, ngToast) {

      $scope.signin = function() {

        var data = {
          username: $scope.username,
          password: $scope.password
        };

        UserService.login(data).success(function(res) {

          if (res.user.role === 'user') {
            $auth.setToken(res.token);
            $localStorage.activeUser = res.user.username;
            $localStorage.userId = res.user._id;

            $location.path('/dashboard');

          } else {
            $auth.setToken(res.token);
            $localStorage.activeStylist = res.user.username;
            $localStorage.stylistId = res.user._id;
            $localStorage.activeSalons = res.user.salons;

            $location.path('/salongallery');

          }

          ngToast.create({
            className: 'success',
            content: res.message,
            dismissOnTimeout: true,
            dismissOnClick: true,
            timeout: 3000
          });

        }).error(function(err) {

          ngToast.create({
            className: 'danger',
            content: err.message,
            dismissOnTimeout: true,
            dismissOnClick: true,
            timeout: 3000
          });

        });
      };

      $scope.signup = function() {

        var salon = {
          name: $scope.salonName,
          address: $scope.salonAddress
        };
        var data = {
          name: {
            first: $scope.first,
            last: $scope.last
          },
          username: $scope.username,
          email: $scope.email,
          password: $scope.password,
          role: 'user'
        };

        if (salon.name && salon.address) {

          SalonService.addSalon(salon).success(function(res) {

            data.salons = res.salon._id;
            data.role = 'stylist';

            UserService.register(data).success(function(response) {

              $location.path('/salonlogin');

              ngToast.create({
                className: 'success',
                content: response.message,
                dismissOnTimeout: true,
                dismissOnClick: true,
                timeout: 3000
              });

            }).error(function(err) {

              ngToast.create({
                className: 'danger',
                content: err.message,
                dismissOnTimeout: true,
                dismissOnClick: true,
                timeout: 3000
              });

            });
          }).error(function(err) {

            ngToast.create({
              className: 'danger',
              content: err.message,
              dismissOnTimeout: true,
              dismissOnClick: true,
              timeout: 3000
            });

          });
        } else {
          UserService.register(data).success(function(res) {

            $location.path('/login');

            ngToast.create({
              className: 'success',
              content: res.message + ' login to continue',
              dismissOnTimeout: true,
              dismissOnClick: true,
              timeout: 3000
            });

          }).error(function(err) {

            ngToast.create({
              className: 'danger',
              content: err.message,
              dismissOnTimeout: true,
              dismissOnClick: true,
              timeout: 3000
            });
          });
        }
      };

      $scope.logout = function() {
        $auth.removeToken();
        $localStorage.$reset();

        UserService.logout(function() {
          $location.path('/');

          ngToast.create({
            className: 'success',
            content: 'successfully logged out',
            dismissOnTimeout: true,
            dismissOnClick: true,
            timeout: 3000
          });
        }, function() {
          ngToast.create({
            className: 'danger',
            content: 'failed to logout!',
            dismissOnTimeout: true,
            dismissOnClick: true,
            timeout: 3000
          });
        });
      };

      $scope.authenticate = function(provider) {
        $auth.authenticate(provider)
          .then(function(response) {

            $auth.setToken(response.data.token);
            $localStorage.activeUser = response.data.user.username;
            $localStorage.userId = response.data.user._id;

            $location.path('/home');

            ngToast.create({
              className: 'success',
              content: 'You are signed in',
              dismissOnTimeout: true,
              dismissOnClick: true,
              timeout: 3000
            });

          })
          .catch(function(err) {

            ngToast.create({
              className: 'danger',
              content: err.data.message,
              dismissOnTimeout: true,
              dismissOnClick: true,
              timeout: 3000
            });

          });
      };

      $scope.isAuthenticated = function() {

        $auth.isAuthenticated();
      };
    }
  ]);
