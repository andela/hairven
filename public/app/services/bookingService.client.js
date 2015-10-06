"use strict";

angular.module('hairvenApp')
  .factory('BookingService',['$http', function($http) {

    var booking = {};

    booking.inputdate = function() {
      $scope.date = Date.now();
    }

  }])