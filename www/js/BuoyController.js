angular.module("Main")

.controller("BuoyController", function($scope, $location, $stateParams, 
    BuoyListService, UserDataService, BuoyUpdateService, ProcessDataService) {

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
        UserDataService.addFavorite(buoyId);
    };

    $scope.buoyName = BuoyListService.get(buoyId).name;
    
    $scope.update = function() {
        BuoyUpdateService.get(buoyId)
        .success(function(data, status, headers, config) {

            $scope.buoyData = ProcessDataService.individual(data);;
        })
        .error(function(data, status, headers, config) {
            alert("error");
        });
    };

    // initialization
    $scope.update();
});