"use strict"

var app = angular.module('hairvenApp', ['ui.router', 'ngStorage', 'satellizer']);

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$authProvider',
  function($stateProvider, $urlRouterProvider, $locationProvider, $authProvider) {

    $stateProvider
      .state('home', {
        url: "/",
        views: {
          '': {
            templateUrl: 'app/partials/nav.view.html'
          },
          'theView@home': {
            templateUrl: 'app/partials/home.view.html',
            controller: 'HomeCtrl'
          }
        }
      })
      .state('hair', {
        url: "/hair",
        views: {
          '': {
            templateUrl: 'app/partials/nav.view.html'
          },
          'theView@hair': {
            templateUrl: 'app/partials/hair.view.html',
            controller: 'HairCtrl'
          }
        }
      })
      .state('dashboard', {
        url: "/dashboard",
        views: {
          '': {
            templateUrl: 'app/partials/nav.view.html'
          },
          'theView@dashboard': {
            templateUrl: 'app/partials/dashboard.view.html'
          }
        }
      })
      .state('contact', {
        url: "/contact",
        views: {
          '': {
            templateUrl: 'app/partials/nav.view.html'
          },
          'theView@contact': {
            templateUrl: 'app/partials/contact.view.html'
          }
        }
      })
      .state('Userdashboard', {
        url: "/Userdashboard",
        views: {
          '': {
            templateUrl: 'app/partials/nav.view.html'
          },
          'theView@Userdashboard': {
            templateUrl: 'app/partials/Userdashboard.view.html'
          }
        }
      })
      .state('gallery', {
        url: "/gallery",
        views: {
          '': {
            templateUrl: 'app/partials/nav.view.html'
          },
          'theView@gallery': {
            templateUrl: 'app/partials/gallery.view.html'
          }
        }
      })
      .state('usergallery', {
        url: "/usergallery",
        views: {
          '': {
            templateUrl: 'app/partials/nav.view.html'
          },
          'theView@usergallery': {
            templateUrl: 'app/partials/usergallery.view.html'
          }
        }
      })
      .state('booking', {
        url: "/booking",
        views: {
          '': {
            templateUrl: 'app/partials/nav.view.html'
          },
          'theView@booking': {
            templateUrl: 'app/partials/booking.view.html'
          }
        }
      })
      .state('salongallery', {
        url: "/salongallery",
        views: {
          '': {
            templateUrl: 'app/partials/nav.view.html'
          },
          'theView@salongallery': {
            templateUrl: 'app/partials/shopOwnerGallery.view.html',
            controller: 'HairCtrl'
          },
          'sideNav@salongallery': {
            templateUrl: 'app/partials/salonSidenav.view.html',
            controller: 'SalonCtrl'
          }
        }
      })
      .state('salon', {
        url: "/salon",
        views: {
          '': {
            templateUrl: 'app/partials/nav.view.html'
          },
          'theView@salon': {
            templateUrl: 'app/partials/salonPage.view.html'
          }
        }
      })
      .state('lock_screen', {
        url: "/lock_screen",
        templateUrl: "app/partials/lock_screen.view.html",
      })
      .state('login', {
        url: "/login",
        views: {
          '': {
            templateUrl: 'app/partials/nav.view.html'
          },
          'theView@login': {
            templateUrl: 'app/partials/login.view.html',
            controller: 'UserCtrl'
          }
        }
      });

    $urlRouterProvider.otherwise("/");
    $locationProvider.html5Mode(true);

    $authProvider.facebook({
      clientId: '1863446777214443'
    });

    $authProvider.twitter({
      url: '/api/auth/twitter'
    });
  }

]);
