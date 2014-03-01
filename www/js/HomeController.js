angular.module("Main")

.controller("HomeController", function($scope, $location, LocalStorageService) {
    $scope.headerTitle = "Home";
    $scope.leftButtons = [{
        type: "button-clear",
        content: "<i class='icon ion-navicon'></i>",
        tap: function(e) {
            $location.path("/settings");
        }
    }];
    $scope.favs = LocalStorageService.get();
    $scope.onRefresh = function() {
    	console.log('refresh');
    	$scope.$broadcast('scroll.refreshComplete');
    };
});