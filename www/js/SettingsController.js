angular.module("Main")

.controller("SettingsController", function($scope, $location, UserDataService) {

    $scope.leftButtons = [{
        type:"button-clear",
        content: "<i class='icon ion-ios7-arrow-back'></i>",
        tap: function(e) {
            $location.path("/home");
        }
    }];
    $scope.rightButtons = [{
        type:"button-clear",
        content: "<i class='icon ion-earth'></i>",
        tap: function(e) {
            $location.path("/map");
        }
    }];
    $scope.canDelete = true;
    $scope.showDelete = true;
    $scope.onDelete = function(item) {
        UserDataService.removeFavorite(item.id);
    };
    $scope.canReorder = false;
    $scope.showReorder = false;
    $scope.canSwipe = false;
});