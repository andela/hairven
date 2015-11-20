"use strict"

var app = angular.module('hairvenApp', ['ngFileUpload', 'ui.router', 'ngStorage', 'satellizer', 'ngToast']);

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$authProvider', 'ngToastProvider',
  function($stateProvider, $urlRouterProvider, $locationProvider, $authProvider, ngToastProvider) {

    $stateProvider
      .state('home', {
        url: "/",
        views: {
          '': {
            templateUrl: 'app/partials/nav.view.html',
            controller: 'UserCtrl'
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
            templateUrl: 'app/partials/nav.view.html',
            controller: 'UserCtrl'
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
            templateUrl: 'app/partials/nav.view.html',
            controller: 'UserCtrl'
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
            templateUrl: 'app/partials/nav.view.html',
            controller: 'UserCtrl'
          },
          'theView@contact': {
            templateUrl: 'app/partials/contact.view.html'
          }
        }
      })
      .state('Userdashboard', {
        url: "/userdashboard",
        views: {
          '': {
            templateUrl: 'app/partials/nav.view.html',
            controller: 'UserCtrl'
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
            templateUrl: 'app/partials/nav.view.html',
            controller: 'UserCtrl'
          },
          'theView@gallery': {
            templateUrl: 'app/partials/userGallery.view.html',
            controller: 'HairCtrl'
          }
        }
      })
      .state('booking', {
        url: "/booking",
        views: {
          '': {
            templateUrl: 'app/partials/nav.view.html',
            controller: 'UserCtrl'
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
            templateUrl: 'app/partials/nav.view.html',
            controller: 'UserCtrl'
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
            templateUrl: 'app/partials/nav.view.html',
            controller: 'UserCtrl'
          },
          'theView@salon': {
            templateUrl: 'app/partials/salonPage.view.html'
          }
        }
      })
      .state('login', {
        url: "/login",
        views: {
          '': {
            templateUrl: 'app/partials/nav.view.html',
            controller: 'UserCtrl'
          },
          'theView@login': {
            templateUrl: 'app/partials/login.view.html',
            controller: 'UserCtrl'
          }
        }
      }).state('registersalon', {
        url: "/registersalon",
        views: {
          '': {
            templateUrl: 'app/partials/nav.view.html',
            controller: 'UserCtrl'
          },
          'theView@registersalon': {
            templateUrl: 'app/partials/salonSignup.view.html',
            controller: 'UserCtrl'
          }
        }
      });

    $authProvider.authHeader = 'x-access-token';
  
    ngToastProvider.configure({
      animation: 'slide'
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
