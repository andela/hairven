'use strict';

angular.module('hairvenApp')
  .controller('SalonCtrl', ['SalonService', '$scope', '$state', '$rootScope', 'ngToast',
    function(SalonService, $scope, $state, $rootScope, ngToast) {
      
      // Helper Function
      function toast(status, message) {
        ngToast.create({
          className: status,
          content: message,
          dismissOnTimeout: true,
          dismissOnClick: true,
          timeout: 2000
        });
      };

      $scope.addSalon = function() {

        var data = {
          name: scope.salonName,
          address: scope.salonAddress
        };

        SalonService.addSalon(data).success(function(res) {
          toast('success', res.message);
          
          state.go('salongallery');
        }).error(function(err) {
          toast('danger', err.message);
        })

      };

      $scope.getSalon = function(id) {

        var salonId = id || $rootScope.$storage.activeSalons[0];

        SalonService.getSalon(salonId).success(function(res) {
        
          $scope.salonName = res.name;
          $scope.salonAddress = res.address;

        }).error(function(err) {
          toast('danger', err.message);
        })

      };

      $scope.updateSalon = function(id) {

        var data = {
          name: scope.salonName,
          address: scope.salonAddress
        };

        SalonService.updateSalon(id, data).success(function(res) {
          toast('success', res.message);

          state.go('salongallery');
        }).error(function(err) {
          toast('danger', err.message);
        })

      };

      $scope.deleteSalon = function(id) {

        SalonService.deleteSalon(id).success(function(res) {
          toast('success', res.message);

          state.go('salongallery');
        }).error(function(err) {
          toast('danger', err.message);
        })

      };
    }
  ]);