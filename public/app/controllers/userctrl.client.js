'use strict';

angular.module('hairvenApp')
  .controller('UserCtrl', ['UserService', '$rootScope', '$scope', '$location', '$localStorage',
    function(UserService, $rootScope, $scope, $location, $localStorage) {
      function successAuth(res) {
        if (res.type == false) {
          console.log(res.data);
        } else {
          $localStorage.token = res.data.token
          window.location = '/';
        }
      };

      $scope.signin = function() {
        var data = {
          email: $scope.email,
          password: $scope.password
        };
        UserService.login(data, successAuth, function() {
          $rootScope.error = 'Authentication failed';
        });
      };

      $scope.signup = function() {
        var data = {
          username: $scope.username,
          email: $scope.email,
          password: $scope.password
        };
        UserService.register(data, successAuth, function(res) {
          $rootScope.error = 'Failed to sign up'
        });
      };

      $scope.logout = function() {
        UserService.logout(function() {
          window.location = '/';
        }, function() {
          console.log('failed to logout!')
        });
      };
      $scope.token = $localStorage.token;
    }
  ]);
