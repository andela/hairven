'use strict'

var app = angular.module('hairvenApp');
app.factory('HairstyleService', ['$http', 'baseUrl', '$localStorage', function($http, baseUrl, $localStorage) {

  var Hairstyle = {

    getAllHairstyles: function() {
      return $http.get(baseUrl + '/api/hairstyles/');
    },

    getOneHairstyle: function(id) {
      return $http.get(baseUrl + '/api/hairstyles/' + id);
    },
    addHairstyle: function(data) {
      return $http.post(baseUrl + '/api/hairstyles/', data);
    },

    updateHairstyle: function(id, data) {
      return $http.put(baseUrl + '/api/hairstyles/' + id, data);
    },

    deleteHairstyle: function(id) {
      return $http.delete(baseUrl + '/api/hairstyles/' + id);
    }
  }


  return Hairstyle;
}]);
