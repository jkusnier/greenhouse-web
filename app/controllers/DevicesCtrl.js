'use strict';

function DevicesCtrl($$getDevices) {
    var vm = this;
    vm.devices = $$getDevices.data;
}

DevicesCtrl.resolve = {
    '$$getDevices': function (GreenhouseService) {
        return GreenhouseService.getDevices();
    }
};

angular
    .module('app')
    .controller('DevicesCtrl', DevicesCtrl);