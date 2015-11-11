'use strict';

angular.module('hairvenApp')
  .controller('UserCtrl', ['UserService', 'SalonService', '$rootScope', '$window', '$scope', '$location', '$localStorage', '$auth',
    function(UserService, SalonService, $rootScope, $window, $scope, $location, $localStorage, $auth) {

      function successAuth(res) {
        console.log(res);
        if (res.type == false) {
          console.log('stop', data);
        } else {
          console.log(res.body);
          $localStorage.token = res.data.token;

          alert('You are in!');
        }
      };
      $scope.signin = function() {

        var data = {
          username: $scope.username,
          password: $scope.password
        };
        UserService.login(data).success(function(res) {

          if (res.type === false) {
            console.log('authentication failed', data);
          } else {
            $auth.setToken(res.token);
            $location.path('/salongallery');
          }
        }).error(function(err) {
          console.log('login failed', err);
          $rootScope.error = 'Authentication failed';
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
            UserService.register(data).success(function(data) {
              if (data.success === false) {
                console.log('registration failed');
                $location.path('/');
              } else {
                $location.path('/login');
              }
            });
          }).error(function(err) {
            console.log(err);
          });
        } else {
          UserService.register(data).success(function(data) {
            if (data.success === false) {
              console.log('registration failed');
              $location.path('/');
            } else {
              $location.path('/login');
            }
          }).error(function(err) {
            console.log('FAILED!!', err);
            $rootScope.error = 'Failed to sign up';
          });
        }
      };

      $scope.logout = function() {
        $auth.removeToken();
        UserService.logout(function() {
          window.location = '/';
        }, function() {
          console.log('failed to logout!');
        });
      };

      $scope.token = $localStorage.token;

      $scope.authenticate = function(provider) {
        $auth.authenticate(provider)
          .then(function(response) {

            $window.localStorage.currentUser = JSON.stringify(response.access_token);
            $rootScope.currentUser = JSON.parse($window.localStorage.currentUser);
            $location.path('/Userdashboard');
          })
          .catch(function(response) {});
      };

      $scope.isAuthenticated = function() {

        $auth.isAuthenticated();
      };
    }
  ]);
