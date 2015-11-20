'use strict';

var app = angular.module('hairvenApp');
app.factory('HairstyleService', ['$http', 'baseUrl', '$localStorage', 'Upload',
 function($http, baseUrl, $localStorage, Upload) {

  var Hairstyle = {

    getAllHairstyles: function() {
      return $http.get(baseUrl + '/api/hairstyles/');
    },

    getSalonHairstyles: function(salonId) {
      return $http.get(baseUrl + '/api/salons/' + salonId + '/hairstyles');
    },

    getOneHairstyle: function(id) {
      return $http.get(baseUrl + '/api/hairstyles/' + id);
    },
    addHairstyle: function(file, data) {

      return Upload.upload({
        url: baseUrl + '/api/hairstyles',
        data: {
          hairPhoto: file,
          name: data.name,
          description: data.description,
          salon: data.salon
        },
        method: 'POST'
      });
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
