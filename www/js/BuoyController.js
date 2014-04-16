angular.module('Main')

.controller('BuoyController', function($scope, $location, $stateParams,
    BuoyListService, UserDataService, BuoyUpdateService, ProcessDataService) {

    var buoyId = $stateParams.buoyId;

    $scope.addToFavorites = function() {
        UserDataService.addFavorite(buoyId);
    };

    $scope.buoyName = BuoyListService.get(buoyId).name;

    $scope.goMap = function() {
        $location.path('/map');
    };

    $scope.update = function() {
        BuoyUpdateService.get(buoyId)
        .success(function(data, status, headers, config) {

            $scope.buoyData = ProcessDataService.individual(data);;
        })
        .error(function(data, status, headers, config) {
            alert('error');
        });
    };

    // initialization
    $scope.update();
});
