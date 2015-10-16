"use strict"

var app = angular.module('hairvenApp', ['ui.router', 'ngStorage']);

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
  function($stateProvider, $urlRouterProvider, $locationProvider) {

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
      .state('signedin', {
        url: "/signin",
        views: {
          '': {
            templateUrl: 'app/partials/nav.view.html'
          },
          'theView@booking': {
            templateUrl: 'app/partials/.view.html'
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
            templateUrl: 'app/partials/shopOwnerGallery.view.html'
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
      .state('signedUp', {
        url: '/signup',
        views: {
          '': {
            templateUrl: 'app/partials/nav.view.html'
          },
          'theView@signedUp': {
            templateUrl: 'app/partials/home.view.html',
            controller: 'UserCtrl'
          }
        }
      })
      // .state('lock_screen', {
      //   url: "/lock_screen",
      //   templateUrl: "app/partials/lock_screen.view.html",
      // })

    .state('login', {
      url: "/login",
      views: {
        '': {
          templateUrl: 'app/partials/nav.view.html'
        },
        'theView@login': {
          templateUrl: 'app/partials/login.view.html'
        }
      }
    });
    $urlRouterProvider.otherwise("/");
    $locationProvider.html5Mode(true);
  }
]);


app.config(function($httpProvider) {
  $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function($q, $location, $localStorage) {
    return {
      'request': function(config) {
        config.headers = config.headers || {};
        if ($localStorage.token) {
          console.log($localStorage.token);
          config.headers.Authorization = 'Bearer' + $localStorage.token;
        }
        return config;
      },
      'responseError': function(response) {
        if (response.status === 401 || response.status === 403) {
          console.log('login failed', response.status)
          $location.path('/login')
        }
        return $q.reject(response);
      }
    };
  }]);
});
