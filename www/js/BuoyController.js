angular.module("Main")

.controller("BuoyController", function($scope, $location, $stateParams, $http, BuoyService, LocalStorageService, BuoyDataService) {
    $scope.headerTitle = $stateParams.buoyId;
    $scope.leftButtons = [{
        type:"button-clear",
        content: "<i class='icon ion-ios7-arrow-back'></i>",
        tap: function(e) {
            $location.path("/map");
        }
    }];
    $scope.buoyId = $stateParams.buoyId;
    //console.log('http://www.ndbc.noaa.gov/data/5day2/'+$scope.buoyId+'_5day.txt');
    $scope.buoyUrl = "http://www.ndbc.noaa.gov/data/5day2/" + $scope.buoyId + "_5day.txt";
    //for testing
    //$scope.buoyUrl = 'http://localhost:4444/testData.txt';

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
            $scope.buoyData = {
                "year": data[0],
                "month": data[1],
                "day": data[2],
                "hour": data[3],
                "minute": data[4],
                "windDirection": data[5],
                "windSpeed": data[6],
                "windGust": data[7],
                "waveHeight": data[8],
                "waveDominantPeriod": data[9],
                "waveAveragePeriod": data[10],
                "medianWaveDirection": data[11],
                "pressure": data[12],
                "airTemp": data[13],
                "waterTemp": data[14],
                "dewPoint": data[15],
                "visibilty": data[16],
                "ptdy": data[17],
                "tide": data[18]
            };
        })
        .error(function(data, status, headers, config) {
            alert("error");
        });
    };
});