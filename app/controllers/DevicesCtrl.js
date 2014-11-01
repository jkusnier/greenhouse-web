'use strict';

function DevicesCtrl($rootScope, $$getDevices) {
    var vm = this;
    vm.devices = $$getDevices.data;
    $rootScope.breadCrumbs = ["devices"];
}

DevicesCtrl.resolve = {
    '$$getDevices': function (GreenhouseService) {
        return GreenhouseService.getDevices();
    }
};

angular
    .module('app')
    .controller('DevicesCtrl', DevicesCtrl);