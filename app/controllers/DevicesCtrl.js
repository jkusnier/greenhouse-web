'use strict';

function DevicesCtrl($rootScope) {
    var vm = this;
    $rootScope.breadCrumbs = [{'name': 'devices', 'url': '/device'}];
    $rootScope.deviceDescription = "Temperature Monitors";
}

angular
    .module('app')
    .controller('DevicesCtrl', DevicesCtrl);