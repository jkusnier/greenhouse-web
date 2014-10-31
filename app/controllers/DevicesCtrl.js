'use strict';

angular.module('app.devices', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/devices', {
        templateUrl: 'views/devices.html',
        controller: 'DevicesCtrl'
    });
}])

.controller('DevicesCtrl', [function () {

}]);