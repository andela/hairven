"use strict"

angular.module('hairvenApp')
  .controller('SalonCtrl', ['SalonService', '$scope', '$state', '$rootScope', '$localStorage',
    function($scope, SalonService, $state, $rootScope, $localStorage) {

      $scope.addSalon = function() {

        var data = {
          name: scope.salonName,
          address: scope.salonAddress
        };

        SalonService.addSalon(data).success(function(res) {

          console.log(res.message)
          state.go('salongallery');
        }).error(function(err) {
          console.log(err.message)

        })

      };

      $scope.getSalon = function(id) {

        SalonService.getSalon(id).success(function(res) {

          $localStorage.salon = res.body;
          state.go('salongallery');
        }).error(function(err) {
          console.log(err.message)

        })

      };

      $scope.updateSalon = function(id) {

        var data = {
          name: scope.salonName,
          address: scope.salonAddress
        };

        SalonService.updateSalon(id, data).success(function(res) {

          console.log(res.message)
          state.go('salongallery');
        }).error(function(err) {
          console.log(err.message)

        })

      };

      $scope.deleteSalon = function(id) {

        SalonService.deleteSalon(id).success(function(res) {

          console.log(res.message)
          state.go('salongallery');
        }).error(function(err) {
          console.log(err.message)

        })

      };

    }
  ]);
