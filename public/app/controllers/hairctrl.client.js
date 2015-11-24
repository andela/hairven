'use strict';

angular.module('hairvenApp')
  .controller('HairCtrl', ['$scope', 'HairstyleService', '$state',
   '$rootScope', 'ngToast', 'Upload', 'baseUrl',
    function($scope, HairstyleService, $state, $rootScope, ngToast, Upload, baseUrl) {

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

       $scope.addHairstyle = function() {

        var hairPhoto = $scope.imageFile;

        var data = {
          name: $scope.name,
          description: $scope.description,
          salon: $rootScope.$storage.activeSalons[0]
        };


        HairstyleService.addHairstyle(hairPhoto, data).success(function(res) {
          toast('success', res.message);

          $state.reload();
        }).error(function(err) {
          toast('danger', err.message);
        });
      };

      $scope.getAllHairstyles = function() {

        HairstyleService.getAllHairstyles().success(function(res) {

          $scope.hairstyles = res;

        }).error(function(err) {
          toast('danger', err.message);
        });
      };

      $scope.getSalonHairstyles = function(id) {

        var salonId = id || $rootScope.$storage.activeSalons[0];

        HairstyleService.getSalonHairstyles(salonId).success(function(res) {
          $scope.hairstyles = res.message || res;

        }).error(function(err) {
          toast('danger', err.message);
        });
      };

      $scope.getOneHairstyle = function(hairId) {

        HairstyleService.getOneHairstyle(hairId).success(function(res) {

          $rootScope.$storage.currentHairstyle = res.body;

        }).error(function(err) {
          toast('danger', err.message);
        });

      };

      $scope.updateHairstyle = function(hairId) {

        var data = {
          name: $scope.name,
          description: $scope.description,
          salon: salonId
        };

        HairstyleService.updateHairstyle(data).success(function(res) {
          toast('success', res.message);

          $state.go('salongallery');
        }).error(function(err) {
          toast('danger', err.message);
        });
      };

      $scope.deleteHairstyle = function(hairId) {

        HairstyleService.deleteHairstyle(hairId).success(function(res) {
          toast('success', res.message);
        }).error(function(err) {
          toast('danger', err.message);
        });
      };
    }
  ]);