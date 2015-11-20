'use strict';

angular.module('hairvenApp')
  .controller('SalonCtrl', ['SalonService', '$scope', '$state', '$rootScope', 'ngToast',
    function(SalonService, $scope, $state, $rootScope, ngToast) {
      
      $scope.addSalon = function() {

        var data = {
          name: scope.salonName,
          address: scope.salonAddress
        };

        SalonService.addSalon(data).success(function(res) {

          ngToast.create({
            className: 'success',
            content: res.message,
            dismissOnTimeout: true,
            dismissOnClick: true,
            timeout: 2000
          });

          state.go('salongallery');
        }).error(function(err) {

          ngToast.create({
            className: 'danger',
            content: err.message,
            dismissOnTimeout: true,
            dismissOnClick: true,
            timeout: 2000
          });
        })

      };

      $scope.getSalon = function(id) {

        var salonId = id || $rootScope.$storage.activeSalons[0];

        SalonService.getSalon(salonId).success(function(res) {
        
          $scope.salonName = res.name;
          $scope.salonAddress = res.address;

        }).error(function(err) {

          ngToast.create({
            className: 'danger',
            content: err.message,
            dismissOnTimeout: true,
            dismissOnClick: true,
            timeout: 2000
          });
        })

      };

      $scope.updateSalon = function(id) {

        var data = {
          name: scope.salonName,
          address: scope.salonAddress
        };

        SalonService.updateSalon(id, data).success(function(res) {

          ngToast.create({
            className: 'success',
            content: res.message,
            dismissOnTimeout: true,
            dismissOnClick: true,
            timeout: 2000
          });

          state.go('salongallery');
        }).error(function(err) {

          ngToast.create({
            className: 'danger',
            content: err.message,
            dismissOnTimeout: true,
            dismissOnClick: true,
            timeout: 2000
          });

        })

      };

      $scope.deleteSalon = function(id) {

        SalonService.deleteSalon(id).success(function(res) {

          ngToast.create({
            className: 'success',
            content: res.message,
            dismissOnTimeout: true,
            dismissOnClick: true,
            timeout: 2000
          });

          state.go('salongallery');
        }).error(function(err) {

          ngToast.create({
            className: 'danger',
            content: err.message,
            dismissOnTimeout: true,
            dismissOnClick: true,
            timeout: 2000
          });

        })

      };

    }
  ]);
