angular.module('Main')

.controller('HomeController', function($scope, $rootScope, $location,
                                       BuoyUpdateService) {
    var init = function() {
            var i = 0,
                favsLength = $rootScope.userData.favorites.length;

                for (i = 0; i < favsLength; i++) {
                    ////TODO////
                    //updateFavorite
                }
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

    init();

});
