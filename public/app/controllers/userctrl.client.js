'use strict';

angular.module('hairvenApp')
  .controller('UserCtrl', ['UserService', 'SalonService', '$rootScope', '$window', '$scope',
    '$state', '$localStorage', '$auth', 'ngToast',
    function(UserService, SalonService, $rootScope, $window, $scope, $state, $localStorage, $auth, ngToast) {

      $rootScope.$storage = $localStorage;

      $scope.loggedIn = $localStorage.loggedIn;

      $scope.signin = function() {

        var data = {
          username: $scope.username,
          password: $scope.password
        };

        UserService.login(data).success(function(res) {

          if (res.user.role === 'user') {
            $auth.setToken(res.token);
            $rootScope.$storage.activeUser = res.user.username;
            $rootScope.$storage.userId = res.user._id;

            $state.go('home');

          } else {
            $auth.setToken(res.token);
            $rootScope.$storage.activeStylist = res.user.username;
            $rootScope.$storage.stylistId = res.user._id;
            $rootScope.$storage.activeSalons = res.user.salons;

            $state.go('salongallery');

          }

          //change login status to true
          $rootScope.$storage.loggedIn = true;

          ngToast.create({
            className: 'success',
            content: res.message,
            dismissOnTimeout: true,
            dismissOnClick: true,
            timeout: 2000
          });

        }).error(function(err) {

          ngToast.create({
            className: 'danger',
            content: err.message,
            dismissOnTimeout: true,
            dismissOnClick: true,
            timeout: 2000
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

              ngToast.create({
                className: 'success',
                content: response.message + ' click on login to continue',
                dismissOnTimeout: true,
                dismissOnClick: true,
                timeout: 2000
              });

            }).error(function(err) {

              ngToast.create({
                className: 'danger',
                content: err.message,
                dismissOnTimeout: true,
                dismissOnClick: true,
                timeout: 2000
              });

            });
          }).error(function(err) {

            ngToast.create({
              className: 'danger',
              content: err.message,
              dismissOnTimeout: true,
              dismissOnClick: true,
              timeout: 2000
            });

          });
        } else {
          UserService.register(data).success(function(res) {

            $state.go('login');

            ngToast.create({
              className: 'success',
              content: res.message + ' login to continue',
              dismissOnTimeout: true,
              dismissOnClick: true,
              timeout: 2000
            });

          }).error(function(err) {

            ngToast.create({
              className: 'danger',
              content: err.message,
              dismissOnTimeout: true,
              dismissOnClick: true,
              timeout: 2000
            });
          });
        }
      };

      $scope.logout = function() {
        $auth.removeToken();
        $rootScope.$storage.$reset();

        UserService.logout(function() {
          if ($state.$current.name === 'home') {
            $state.reload();
          } else {
            $state.go('home');
          }

          ngToast.create({
            className: 'success',
            content: 'successfully logged out',
            dismissOnTimeout: true,
            dismissOnClick: true,
            timeout: 2000
          });
        }, function() {
          ngToast.create({
            className: 'danger',
            content: 'failed to logout!',
            dismissOnTimeout: true,
            dismissOnClick: true,
            timeout: 2000
          });
        });
      };

      $scope.authenticate = function(provider) {
        $auth.authenticate(provider)
          .then(function(response) {

            $auth.setToken(response.data.token);
            $rootScope.$storage.activeUser = response.data.user.username;
            $rootScope.$storage.userId = response.data.user._id;

            $state.go('home');

            //change login status to true
            $rootScope.$storage.loggedIn = true;

            ngToast.create({
              className: 'success',
              content: 'You are signed in',
              dismissOnTimeout: true,
              dismissOnClick: true,
              timeout: 2000
            });

          })
          .catch(function(err) {

            ngToast.create({
              className: 'danger',
              content: err.data.message,
              dismissOnTimeout: true,
              dismissOnClick: true,
              timeout: 2000
            });

          });
      };

      $scope.isAuthenticated = function() {

        $auth.isAuthenticated();
      };
    }
  ]);