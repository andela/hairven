'use strict'

var app = angular.module('hairvenApp');
app.factory('SalonService', ['$http', 'baseUrl', '$localStorage', function($http, baseUrl, $localStorage) {

  var Salon = {

    getSalon: function(id) {
      return $http.get(baseUrl + '/api/salons/' + id);
    },

    addSalon: function(data) {
      return $http.post(baseUrl + '/api/salons/', data);
    },

    updateSalon: function(id, data) {
      return $http.put(baseUrl + '/api/salons/' + id, data);
    },

    deleteSalon: function(id) {
      return $http.delete(baseUrl + '/api/salons/' + id);
    }
  }


  return Salon;
}]);
