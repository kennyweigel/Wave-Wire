angular.module("Main")

.controller("BuoyController", function($scope, $location, $stateParams,
    $http, BuoyService, LocalStorageService, BuoyDataService, ProcessDataService) {

    var buoyId = $stateParams.buoyId;

    $scope.headerTitle = buoyId;

    $scope.leftButtons = [{
        type:"button-clear",
        content: "<i class='icon ion-ios7-arrow-back'></i>",
        tap: function(e) {
            $location.path("/map");
        }
    }];

    $scope.addToFavorites = function() {
        LocalStorageService.add(buoyId);
    };

    $scope.buoyName = BuoyService.get(buoyId).name;
    
    $scope.update = function() {
        BuoyDataService.get(buoyId)
        .success(function(data, status, headers, config) {

            $scope.buoyData = ProcessDataService.individual(data);;
        })
        .error(function(data, status, headers, config) {
            alert("error");
        });
    };

    //initialization
    $scope.update();
});