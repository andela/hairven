"use strict"
/**
 *  Module
 *
 * Description
 */
var app = angular.module('hairvenApp', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise("/");

    $stateProvider
        .state('home', {
            url: "/",
            views: {
                '': {
                    templateUrl: 'app/views/nav.view.html'
                },
                'theView@home': {
                    templateUrl: 'app/views/home.view.html',
                    controller: 'HomeCtrl'
                }
            }
        })
        .state('hair', {
            url: "/hair",
            views: {
                '': {
                    templateUrl: 'app/views/nav.view.html'
                },
                'theView@hair': {
                    templateUrl: 'app/views/hair.view.html',
                    controller: 'HairCtrl'
                }
            }
        })
        .state('dashboard', {
            url: "/dashboard",
            views: {
                '': {
                    templateUrl: 'app/views/nav.view.html'
                },
                'theView@dashboard': {
                    templateUrl: 'app/views/dashboard.view.html'
                }
            }
        })
        .state('Userdashboard', {
            url: "/Userdashboard",
            views: {
                '': {
                    templateUrl: 'app/views/nav.view.html'
                },
                'theView@Userdashboard': {
                    templateUrl: 'app/views/Userdashboard.view.html'
                }
            }
        })
        .state('gallery', {
            url: "/gallery",
            views: {
                '': {
                    templateUrl: 'app/views/nav.view.html'
                },
                'theView@gallery': {
                    templateUrl: 'app/views/gallery.view.html'
                }
            }
        })
        .state('usergallery', {
            url: "/usergallery",
            views: {
                '': {
                    templateUrl: 'app/views/nav.view.html'
                },
                'theView@usergallery': {
                    templateUrl: 'app/views/usergallery.view.html'
                }
            }
        })
        .state('booking', {
            url: "/booking",
            views: {
                '': {
                    templateUrl: 'app/views/nav.view.html'
                },
                'theView@booking': {
                    templateUrl: 'app/views/booking.view.html'
                }
            }
        })
        .state('lock_screen', {
            url: "/lock_screen",
            templateUrl: "app/views/lock_screen.view.html",
        })
        .state('login', {
            url: "/login",
            views: {
                '': {
                    templateUrl: 'app/views/nav.view.html'
                },
                'theView@login': {
                    templateUrl: 'app/views/login.view.html'
                }
            }
        });

    $locationProvider.html5Mode(true);
});
