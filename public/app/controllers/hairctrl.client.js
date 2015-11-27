'use strict';

angular.module('hairvenApp')
  .controller('HairCtrl', ['$scope', 'HairstyleService', '$state',
    '$rootScope', 'ngToast', 'Upload', 'baseUrl', '$location',
    function($scope, HairstyleService, $state, $rootScope, ngToast, Upload, baseUrl, $location) {

      $scope.addHairstyle = function() {

        var hairPhoto = $scope.imageFile;

        var data = {
          name: $scope.name,
          description: $scope.description,
          salon: $rootScope.$storage.activeSalons[0]
        };

        HairstyleService.addHairstyle(hairPhoto, data).success(function(res) {

          ngToast.create({
            className: 'success',
            content: res.message,
            dismissOnTimeout: true,
            dismissOnClick: true,
            timeout: 2000
          });

          $state.reload()
        }).error(function(err) {

          ngToast.create({
            className: 'danger',
            content: err.message,
            dismissOnTimeout: true,
            dismissOnClick: true,
            timeout: 2000
          });

        });
      };

      $scope.getAllHairstyles = function() {

        HairstyleService.getAllHairstyles().success(function(res) {
          $scope.hairstyles = res;
        }).error(function(err) {

          ngToast.create({
            className: 'danger',
            content: err.message,
            dismissOnTimeout: true,
            dismissOnClick: true,
            timeout: 2000
          });

        });
      };

      $scope.getSalonHairstyles = function(id) {

        var salonId = id || $rootScope.$storage.activeSalons[0];

        HairstyleService.getSalonHairstyles(salonId).success(function(res) {
          $scope.hairstyles = res.message || res;
        }).error(function(err) {

          ngToast.create({
            className: 'danger',
            content: err.message,
            dismissOnTimeout: true,
            dismissOnClick: true,
            timeout: 2000
          });

        });
      };

      $rootScope.currentHairstyle = $rootScope.$storage.currentHairstyle;

      $scope.getOneHairstyle = function(hairId) {
        HairstyleService.getOneHairstyle(hairId).success(function(res) {
          $location.url("/edithair");
          $rootScope.$storage.currentHairstyle = res;
        }).error(function(err) {

          ngToast.create({
            className: 'danger',
            content: err.message,
            dismissOnTimeout: true,
            dismissOnClick: true,
            timeout: 2000
          });

        });

      };

      $scope.updateHairstyle = function(hairId) {
        var hairPhoto = $scope.imageFile;
        var data = {
          name: $scope.currentHairstyle.name,
          description: $scope.currentHairstyle.description,
          salon: $rootScope.$storage.activeSalons[0]
        };
        HairstyleService.updateHairstyle(hairId, hairPhoto, data).success(function(res) {

          ngToast.create({
            className: 'success',
            content: res.message,
            dismissOnTimeout: true,
            dismissOnClick: true,
            timeout: 2000
          });

          $state.go('salongallery')
        }).error(function(err) {

          ngToast.create({
            className: 'danger',
            content: err.message,
            dismissOnTimeout: true,
            dismissOnClick: true,
            timeout: 2000
          });

        });
      };

      $scope.deleteHairstyle = function(hairId) {

        HairstyleService.deleteHairstyle(hairId).success(function(res) {

          ngToast.create({
            className: 'success',
            content: res.message,
            dismissOnTimeout: true,
            dismissOnClick: true,
            timeout: 2000
          });

        }).error(function(err) {

          ngToast.create({
            className: 'danger',
            content: err.message,
            dismissOnTimeout: true,
            dismissOnClick: true,
            timeout: 2000
          });

        });

      };

    }
  ]);
