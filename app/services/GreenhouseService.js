function GreenhouseService($http) {
    this.getDevices = function () {
        return $http({
            method: 'GET',
            url: 'http://api.weecode.com/greenhouse/v1/devices'
        });
    };

    this.getEnvironment = function (id) {
        return $http({
            method: 'GET',
            url: 'http://api.weecode.com/greenhouse/v1/devices/'+id+'/environment'
        });
    };

    this.getTempHist = function (id) {
        return $http({
            method: 'GET',
            url: 'http://api.weecode.com/greenhouse/v1/devices/'+id+'/hist/fahrenheit'
        });
    }

    this.getTempData = function (id) {
        return $http({
            method: 'GET',
            url: 'http://api.weecode.com/greenhouse/v1/devices/'+id+'/data/fahrenheit'
        });
    }
}

angular
    .module('app')
    .service('GreenhouseService', GreenhouseService);
