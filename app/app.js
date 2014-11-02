'use strict';

// Declare app level module which depends on views, and components
angular
    .module('app', [
        'ngRoute',
        'highcharts-ng',
        'app.version'
    ])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/devices', {
                templateUrl: 'views/devices.html',
                controller: 'DevicesCtrl as vm',
                resolve: DevicesCtrl.resolve
            })
            .when('/device/:id', {
                templateUrl: 'views/device.html',
                controller: 'DeviceCtrl as vm',
                resolve: DeviceCtrl.resolve
            })
            .otherwise({redirectTo: '/devices'});
    }]);
