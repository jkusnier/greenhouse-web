'use strict';

function DevicesCtrl($rootScope, GreenhouseService) {
    var vm = this;
    $rootScope.breadCrumbs = [{'name': 'devices', 'url': '/device'}];
    $rootScope.deviceDescription = "Temperature Monitors";

    var listener = $rootScope.$watch('allDevices', function () {
        for (var device in $rootScope.allDevices) {
            (function (device) {
                GreenhouseService.getEnvironment($rootScope.allDevices[device].coreid)
                    .success(function (data, status, headers, config) {
                        $rootScope.allDevices[device].environment = data;
                    })
                    .error(function (data, status, headers, config) {
                    });
            })(device);
        }

        if ($rootScope.allDevices !== undefined) {
            listener();
        }
    });
}

angular
    .module('app')
    .controller('DevicesCtrl', DevicesCtrl);