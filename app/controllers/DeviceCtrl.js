'use strict';

function DeviceCtrl($rootScope, $scope, $route, $interval, GreenhouseService, $$getEnvironment) {
    var vm = this;
    vm.environment = $$getEnvironment.data;
    vm.temperatureData = [];
    $rootScope.breadCrumbs = ["devices", "device"];

    vm.refreshData = refreshData;
    console.log($route);

    $scope.chartConfig = {
        rangeSelector: {
            selected: 1
        },
        options: {
            chart: {
                type: 'areaspline',
                threshold: null,
                zoomType: 'x'
            }
        },
        series: [{
            name: 'Inside Temperature',
            data: undefined,
            lineWidth: 0.1,
            tooltip: {
                valueDecimals: 2
            },
            fillColor: {
                linearGradient: {
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: 1
                },
                stops: [
                    [0, Highcharts.getOptions().colors[0]],
                    [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                ]
            }
        }],
        title: {
            text: 'History'
        },
        xAxis: {type: 'datetime'},
        yAxis: {title: {text: 'Temperature (F°)'}},
        loading: false
    };

    function refreshData(id) {
        GreenhouseService.getEnvironment(id)
            .then(function (resp) {
                vm.environment = resp.data;
            }, function (err) {
                console.error(err);
            });
    }

    var intervalPromise = $interval(function () {
        this.refreshData($route.current.params.id);
    }.bind(this), 15000);

    $scope.$on('$destroy', function () {
        $interval.cancel(intervalPromise);
    });

    // Collect our grid data
    (function () {
        GreenhouseService.getTempHist($route.current.params.id).then(function (res) {
            var data = [];
            for (var rec in res.data) {
                data.push([Date.parse(res.data[rec].time), res.data[rec].fahrenheit]);
            }
            $scope.chartConfig.series[0].data = data;
        }, function() {
            // If it fails, just init an empty array to indicate to the next method that we are done
            $scope.chartConfig.series[0].data = [];
        });
        GreenhouseService.getTempData($route.current.params.id).then(function (res) {
            var data = [];
            for (var rec in res.data) {
                data.push([Date.parse(res.data[rec].time), res.data[rec].fahrenheit]);
            }

            // Wait for the other collection to finish or fail
            var sleeper = function() {
                if ($scope.chartConfig.series[0].data == undefined) {
                    setTimeout(sleeper, 200);
                }
            };
            var oldData = $scope.chartConfig.series[0].data;
            $scope.chartConfig.series[0].data = oldData.concat(data);
        });
    })();
}

DeviceCtrl.resolve = {
    '$$getEnvironment': function (GreenhouseService, $route) {
        return GreenhouseService.getEnvironment($route.current.params.id);
    }
};

angular
    .module('app')
    .controller('DeviceCtrl', DeviceCtrl);