"use strict"

angular.module('hairvenApp')
  .factory('UserService', ['http', 'baseUrl', function($http, baseUrl) {

      function changeUser(user) {
        angular.extend(currentUser, user);
      }
      //function decodes response from the data base which contains signed token in base64
      function base64Decode = function(token) {
        var output = str.replace('-', '+').replace('_', '/');
        switch (output.length % 4) {
          case 0:
            break;
          case 2:
            output += '==';
            break;
          case 3:
            output += '=';
            break;
          default:
            throw 'Illegal base64url string!';
        }
        return window.atob(output);
      };

      //this methid gets the token information
      function getTokenInformation = function() {
        var token = $localStorage.token;
        var User = {};
        if (typeof token !== undefined) {
          var encoded = token.split('.')[1];
          user = JSON.parse(base64Decode(encoded));
        }
        return User;
      }

      var currentUser = getTokenInformation();
      return {
        register: function(data, success, error) {
          $http.post('baseUrl' + '/signup').success(success).error(error)
        },
        login = function(data, success, error) {
          $http.post('baseurl' + '/login').success(success).error(error)
        },
        logout = function(success) {
          changeUser({});
          delete $localStorage.token;
          success();
        }
        getUser = function(id, success, error) {
          $http.get('baseUrl' + '/users/' + id).success(success).error(error)
        },
        updateUser = function(id, success, error) {
          $http.put('baseUrl' + '/users/' + id).success(success).error(error)
        },
        deleteUser = function(id, success, error) {
          $http.delete('baseUrl' + '/users/' + id).success(success).error(error)
        }

      }]);
