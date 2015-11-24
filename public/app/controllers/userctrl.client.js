'use strict';

angular.module('hairvenApp')
  .controller('UserCtrl', ['UserService', 'SalonService', '$rootScope', '$window', '$scope',
    '$state', '$localStorage', '$auth', 'ngToast',
    function(UserService, SalonService, $rootScope, $window, $scope, $state, $localStorage, $auth, ngToast) {

      // Helper Function
      function toast(status, message) {
        ngToast.create({
          className: status,
          content: message,
          dismissOnTimeout: true,
          dismissOnClick: true,
          timeout: 2000
        });
      };

      $rootScope.$storage = $localStorage;

      $scope.loggedIn = $localStorage.loggedIn;

      $scope.signin = function() {

        var data = {
          username: $scope.user_username,
          password: $scope.user_password
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
          toast('success', res.message);
        }).error(function(err) {
          toast('danger', err.message);
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
              $state.go('login');
              toast('success', response.message + ' click on login to continue');
            }).error(function(err) {
              toast('danger', err.message);
            });
          }).error(function(err) {
            toast('danger', err.message);
          });
        } else {
          UserService.register(data).success(function(res) {
            $state.reload();
            toast('success', res.message + ' login to continue');
          }).error(function(err) {
            toast('danger', err.message);
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

          toast('success', 'successfully logged out');
        }, function() {
          toast('danger', 'failed to logout!');
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
            toast('success', 'You are signed in');
          })
          .catch(function(err) {
            toast('danger', err.data.message);
          });
      };

      $scope.isAuthenticated = function() {

        $auth.isAuthenticated();
      };
    }
  ]);