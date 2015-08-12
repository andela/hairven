"use strict"

angular.module('hairvenApp')
    .factory('UserService', ['http', 'baseUrl', function($http, baseUrl) {
        var User = {};

        User.getOne = function(id) {
            return $http.get('baseUrl' + '/users/' + id).then(function(res) {
                return res.data;
            });
        };

        User.updateOne = function(id) {
            return $http.put('baseUrl' + '/users/' + id).then(function(res) {
                return res.data;
            });
        };

        User.deleteOne = function(id) {
            return $http.delete('baseUrl' + '/users/' + id).then(function(res) {
                return res.data;
            });
        };
        return User;
    }])
