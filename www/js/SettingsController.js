angular.module("Main")

.controller("SettingsController", function($scope, $location, LocalStorageService) {
    $scope.headerTitle = "Settings";
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
    $scope.favs = LocalStorageService.get();
    $scope.canDelete = true;
    $scope.showDelete = true;
    $scope.onDelete = function(item) {
        console.log("onDelete");
        console.log(item)
    };
    $scope.canReorder = true;
    $scope.showReorder = true;
    $scope.onReorder = function() {
        console.log("onReorder");
    };
    $scope.canSwipe = true;
    $scope.optionButtons = [
        {
            text: 'Delete',
            type: 'button',
            onTap: function(item) {
                console.log("delete item");
                console.log(item);
                console.log(this);
            }
        },
        {
            text: "test",
            type: 'button',
            onTap: function(item) {
                console.log('test item');
                console.log(item);
            }
        }
    ];
});