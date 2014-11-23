'use strict';

function DevicesCtrl($rootScope) {
    var vm = this;
    $rootScope.breadCrumbs = [{'name': 'devices', 'url': '/device'}];
}

angular
    .module('app')
    .controller('DevicesCtrl', DevicesCtrl);