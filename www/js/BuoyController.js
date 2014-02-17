angular.module("Main")

.controller('BuoyController', function($scope, $location, $stateParams, $http, BuoyService, LocalStorageService, BuoyDataService) {
    $scope.headerTitle = $stateParams.buoyId;
    $scope.leftButtons = [{
        type:"button-clear",
        content: "<i class='icon ion-ios7-arrow-back'></i>",
        tap: function(e) {
            $location.path("/map");
        }
    }];
    $scope.buoyId = $stateParams.buoyId;
    console.log('http://www.ndbc.noaa.gov/data/5day2/'+$scope.buoyId+'_5day.txt');
    //$scope.buoyUrl = 'http://www.ndbc.noaa.gov/data/5day2/'+$scope.buoyId+'_5day.txt';
    //for testing
    $scope.buoyUrl = 'http://localhost:4444/testData.txt';

    $scope.addToFavorites = function() {
        LocalStorageService.add($scope.buoyId);
    };
    $scope.buoyName = BuoyService.get($stateParams.buoyId).name;

    $scope.update = function() {
        BuoyDataService.get($scope.buoyId)
        .success(function(data, status, headers, config) {
            var removeNull= function(data) {
                var index = data.indexOf("");
                if (index > -1) {

                    data.splice(index, 1);
                    removeNull(data);
                }
                return data;
            };
            data = data.split('\n');
            data = data[2];
            data = data.split(" ");
            data = removeNull(data);
            data = {
                "year": data[0],
                "month": data[1],
                "day": data[2],
                "hour": data[3],
                "minute": data[4],
                "wind-direction": data[5],
                "wind-speed": data[6],
                "wind-gust": data[7],
                "wave-height": data[8],
                "wave-dominant-period": data[9],
                "wave-average-period": data[10],
                "median-wave-direction": data[11],
                "pressure": data[12],
                "air-temp": data[13],
                "water-temp": data[14],
                "dew-point": data[15],
                "visibilty": data[16],
                "ptdy?": data[17],
                "tide": data[18]
            };
            //Dummy test data for now
            $scope.testData = data.month;
        })
        .error(function(data, status, headers, config) {
            alert("error");
        });
    };
});