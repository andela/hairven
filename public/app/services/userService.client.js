"use strict"

var app = angular.module('hairvenApp');
app.factory('UserService', ['$http', 'baseUrl', '$localStorage', function($http, baseUrl, $localStorage) {

  var currentUser = getTokenInformation();
  var User = {
    register: function(data) {
      return $http.post(baseUrl + '/api/signup', data);
    },
    login: function(data) {
      return $http.post(baseUrl + '/api/login', data);
    },
    facebookLogin: function() {
      $http.get(baseUrl + '/api/auth/facebook/');
    },
    twitterLogin: function() {
      $http.get(baseUrl + '/api/auth/twitter/');
    },
    logout: function(success) {
      changeUser({});
      delete $localStorage.token;
      success();
    },
    currentUser: function() {
      return getTokenInformation();
    },

    updateUser: function(id, success, error) {
      $http.put(baseUrl + '/api/users/' + id).success(success).error(error);
    },
    deleteUser: function(id, success, error) {
      $http.delete(baseUrl + '/api/users/' + id).success(success).error(error);
    }
  };

  //function decodes response from the data base which contains signed token in base64
  function base64Decode(token) {
    var output = token.replace('-', '+').replace('_', '/');
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

  //this method gets the token information
  function getTokenInformation() {
    var token = $localStorage.token;
    var user = {};
    if (typeof token !== 'undefined') {
      var encoded = token.split('.')[1];
      user = JSON.parse(base64Decode(encoded));
    }
    return user;
  };

  function changeUser(user) {
    angular.extend(User.currentUser, user);
  }
  return User;

}]);
