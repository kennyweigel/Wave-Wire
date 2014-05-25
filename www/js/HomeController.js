angular.module('Main')

.controller('HomeController', function($scope, $rootScope, $location,
                                       BuoyUpdateService) {
    var init = function() {
            var i = 0;
        },
        updateFavorites  = function(buoyId) {
            BuoyUpdateService.get(buoyId)
            .success(function(data, status, headers, config) {
                ////TODO////
            })
            .error(function(data, status, headers, config) {
                alert("error");
            });
        };


    $scope.goSettings = function() {
        $location.path('/settings');
    };

    $scope.onRefresh = function() {
    	console.log('refresh');
    	$scope.$broadcast('scroll.refreshComplete');
    };

    $scope.refreshFavorites = function() {
        var i = 0;
        console.log('refresh');
        console.log($rootScope.userData.favorites);

        //for (i = 0; i < $rootScope.userData.favorites.length; i++) {
        //    console.log('run');
        //}

    };

    init();

});
