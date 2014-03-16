angular.module("Main")

.controller("HomeController", function($scope, $location) {

    $scope.leftButtons = [{
        type: "button-clear",
        content: "<i class='icon ion-navicon'></i>",
        tap: function(e) {
            $location.path("/settings");
        }
    }];
    $scope.onRefresh = function() {
    	console.log('refresh');
    	$scope.$broadcast('scroll.refreshComplete');
    };
});