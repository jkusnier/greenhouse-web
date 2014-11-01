'use strict';

function DeviceCtrl($route, GreenhouseService, $$getEnvironment) {
    var vm = this;
    vm.environment = $$getEnvironment.data;

    vm.refreshData = refreshData;

    function refreshData(id) {
        GreenhouseService.getEnvironment(id)
            .then(function (resp) {
                vm.environment = resp.data;
            }, function (err) {
                console.error(err);
            });
    }
}

DeviceCtrl.resolve = {
    '$$getEnvironment': function (GreenhouseService, $route) {
        return GreenhouseService.getEnvironment($route.current.params.id);
    }
};

angular
    .module('app')
    .controller('DeviceCtrl', DeviceCtrl);