angular.module('Main')

.controller('SettingsController', function($scope, $location, UserDataService) {

    $scope.canDelete = true;
    $scope.showDelete = true;

    $scope.goHome = function() {
        $location.path('/home');
    };

    $scope.goMap = function() {
        $location.path('/map');
    }

    $scope.onDelete = function(item) {
        UserDataService.removeFavorite(item.id);
    };
    $scope.canReorder = false;
    $scope.showReorder = false;
    $scope.canSwipe = false;
});