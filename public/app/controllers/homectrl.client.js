'use strict'

angular.module('hairvenApp')
  .controller('HomeCtrl', ['$scope', '$state', function($scope, $state) {
    $(function() {
      // OPACITY OF BUTTON SET TO 0%
      $(".roll").css("opacity", "0");

      // ON MOUSE OVER
      $(".roll").hover(function() {

          // SET OPACITY TO 70%
          $(this).stop().animate({
            opacity: .7
          }, "slow");
        },

        // ON MOUSE OUT
        function() {

          // SET OPACITY BACK TO 50%
          $(this).stop().animate({
            opacity: 0
          }, "slow");
        });
    });

    $scope.redirect = function(link) {
      $state.go(link);
    };
    
  }]);
