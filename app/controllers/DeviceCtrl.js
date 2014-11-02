'use strict';

function DeviceCtrl($rootScope, $scope, $route, $interval, GreenhouseService, $$getEnvironment) {
    var vm = this;
    vm.environment = $$getEnvironment.data;
    vm.temperatureData = [];
    $rootScope.breadCrumbs = ["devices","device"];

    vm.refreshData = refreshData;
    console.log($route);

    function setChartConfig() {
        $scope.chartConfig = {
            rangeSelector: {
                selected: 1
            },
            title: {
                text: 'History'
            },
            xAxis: {
                type: 'datetime'
            },
            yAxis: {
                title: {
                    text: 'Temperature (F°)'
                }
            },
            series: [{
                name: 'Inside Temperature',
                data: vm.temperatureData,
                type: 'areaspline',
                threshold: null,
                marker: { enabled: false },
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
            }]
        }
    }
    setChartConfig();

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

    // Collect our grid data
    (function () {
        GreenhouseService.getTempHist($route.current.params.id).then(function (res) {
            for (var rec in res.data) {
                vm.temperatureData.push([Date.parse(res.data[rec].time), res.data[rec].fahrenheit]);
            }
            GreenhouseService.getTempData($route.current.params.id).then(function (res) {
                for (var rec in res.data) {
                    vm.temperatureData.push([Date.parse(res.data[rec].time), res.data[rec].fahrenheit]);
                }
                setChartConfig();
            });
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