'use strict';

angular.module('hairvenApp')
  .controller('UserCtrl', ['UserService', '$rootScope', '$window', '$scope', '$location', '$localStorage', '$auth',
    function(UserService, $rootScope, $window, $scope, $location, $localStorage, $auth) {

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
      $rootScope.signin = function() {

        var data = {
          username: $scope.username,
          password: $scope.password
        };
        UserService.login(data, function(res) {

          if (res.type === false) {
            console.log('authentication failed', data);
          } else {
            $auth.setToken(res.token);

            console.log('you are signed in');
          }
        }, function(err) {
          console.log('login failed', err);
          $rootScope.error = 'Authentication failed';
        });
      };

      $rootScope.signup = function() {
        var data = {
          username: $scope.username,
          email: $scope.email,
          password: $scope.password
        };
        UserService.register(data, function(data) {
          if (data.success === false) {
            console.log('registration failed');
            $location.path('/');
          } else {
            // $localStorage.token = data.token;
            console.log('you are registered');
          }
        }, function(err) {
          console.log('FAILED!!', err);
          $rootScope.error = 'Failed to sign up';
        });
      };

      $scope.currentUser = UserService.currentUser();
      $rootScope.logout = function() {
        $auth.removeToken();
        UserService.logout(function() {
          window.location = '/';
        }, function() {
          console.log('failed to logout!');
        });
      };
      $scope.token = $localStorage.token;

      $rootScope.authenticate = function(provider) {
        $auth.authenticate(provider)
          .then(function(response) {

            $window.localStorage.currentUser = JSON.stringify(response.access_token);
            $rootScope.currentUser = JSON.parse($window.localStorage.currentUser);
          })
          .catch(function(response) {});
      };

      $rootScope.isAuthenticated = function() {

        $auth.isAuthenticated();
      };
    }
  ]);
