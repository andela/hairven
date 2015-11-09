"use strict"

angular.module('hairvenApp')
  .controller('HairCtrl', ['HairstyleService', '$scope', '$state', '$rootScope', '$localStorage',
    function($scope, HairstyleService, $state, $rootScope, $localStorage) {

      $scope.addHairstyle = function(salonId) {

        var data = {
          name: $scope.name,
          description: $scope.description,
          salon: salonId
        };

        HairstyleService.addHairstyle(data).success(function(res) {
          console.log(res.message);
          $state.go('salongallery')
        }).error(function(err) {

          console.log(err);
        });
      };


      $scope.getAllHairstyles = function() {

        HairstyleService.getAllHairstyles().success(function(res) {
          console.log(res.body);
          $state.go('gallery')
        }).error(function(err) {

          console.log(err);
        });
      };

      $scope.getOneHairstyle = function(hairId) {

        HairstyleService.getOneHairstyle(hairId).success(function(res) {
          $localStorage.currentHairstyle = res.body;
        }).error(function(err) {

          console.log(err);
        });

      };

      $scope.updateHairstyle = function(hairId) {

        var data = {
          name: $scope.name,
          description: $scope.description,
          salon: salonId
        };

        HairstyleService.updateHairstyle(data).success(function(res) {
          console.log(res.message);
          $state.go('salongallery')
        }).error(function(err) {

          console.log(err);
        });
      };

      $scope.deleteHairstyle = function(hairId) {

        HairstyleService.deleteHairstyle(hairId).success(function(res) {
          console.log(res.message);
        }).error(function(err) {

          console.log(err);
        });

      };

    }
  ]);
