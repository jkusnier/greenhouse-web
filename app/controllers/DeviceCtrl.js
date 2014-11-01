'use strict';

function DeviceCtrl($rootScope, $scope, $route, $interval, GreenhouseService, $$getEnvironment) {
    var vm = this;
    vm.environment = $$getEnvironment.data;
    $rootScope.breadCrumbs = ["devices","device"];

    vm.refreshData = refreshData;
    console.log($route);

    function refreshData(id) {
        GreenhouseService.getEnvironment(id)
            .then(function (resp) {
                vm.environment = resp.data;
            }, function (err) {
                console.error(err);
            });
    }

    var intervalPromise = $interval(function(){
        this.refreshData($route.current.params.id);
    }.bind(this), 15000);

    $scope.$on('$destroy', function () { $interval.cancel(intervalPromise); });
}

DeviceCtrl.resolve = {
    '$$getEnvironment': function (GreenhouseService, $route) {
        return GreenhouseService.getEnvironment($route.current.params.id);
    }
};

angular
    .module('app')
    .controller('DeviceCtrl', DeviceCtrl);