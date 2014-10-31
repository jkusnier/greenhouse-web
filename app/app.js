'use strict';

// Declare app level module which depends on views, and components
angular.module('app', [
    'ngRoute',
    'app.devices',
    'app.version'
]).
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .otherwise({redirectTo: '/devices'});
    }]);