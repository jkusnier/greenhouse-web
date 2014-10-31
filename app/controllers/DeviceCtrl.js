'use strict';

function DeviceCtrl($$getEnvironment) {
    var vm = this;
    vm.environment = $$getEnvironment.data;
}

DeviceCtrl.resolve = {
    '$$getEnvironment': function (GreenhouseService, $route) {
        return GreenhouseService.getEnvironment($route.current.params.id);
    }
};

angular
    .module('app')
    .controller('DeviceCtrl', DeviceCtrl);