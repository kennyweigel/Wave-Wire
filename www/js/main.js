angular.module("Main", ["ionic","Main.BuoyService","Main.LocalStorageService"])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    // setup an abstract state for the tabs directive
    .state('home', {
      url: "/home",
      templateUrl: "templates/home.html",
      controller: "MainController"
    })

    // the pet tab has its own child nav-view and history
    .state("settings", {
        url: "/settings",
        templateUrl: "templates/settings.html",
        controller: "SettingsController"
    })

    .state("map", {
        url: "/map",
        templateUrl: "templates/map.html",
        controller: "MapController"
    })

    .state("buoy/:buoyId", {
        url: "/buoy/:buoyId",
        templateUrl: "templates/buoy.html",
        controller: "BuoyController"
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/home');

})

.controller('MainController', function($scope, $location) {
    $scope.headerTitle = "Home";
    $scope.leftButtons = [{
        type:"button-clear",
        content: "<i class='icon ion-navicon'></i>",
        tap: function(e) {
            $location.path("/settings");
        }
    }];
})

.controller('SettingsController', function($scope, $location) {
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
})

.controller('MapController', function($scope, $location, $ionicLoading, BuoyService) {
    $scope.headerTitle = "Map";
    $scope.leftButtons = [{
        type:"button-clear",
        content: "<i class='icon ion-ios7-arrow-back'></i>",
        tap: function(e) {
            $location.path("/settings");
        }
    }];
    $scope.rightButtons = [{
        type:"button-clear",
        content: "<i class='icon ion-navigate'></i>",
        tap: function(e) {
            //centerOnMe();
            $scope.initialize();
        }
    }];


    $scope.initialize = function() {
        console.log('map initialize');
        var mapOptions = {
            center: new google.maps.LatLng(43.07493,-89.381388),
            //center: myLatLng,
            zoom: 7,
            mapTypeId: google.maps.MapTypeId.TERRAIN,
            disableDefaultUI: true
        };
        var allBuoys = BuoyService.all();
        var allBuoysLength = allBuoys.length;
        var j = 0;
    
        var map = new google.maps.Map(document.getElementById("map"), mapOptions);

        function showBuoyModal(id) {

        }

        console.log(allBuoysLength);
        for (j = 0; j < allBuoysLength; j += 1) {
            buoy = allBuoys[j];
            buoyLatLng = new google.maps.LatLng(buoy.lat, buoy.lng);
            buoyMarker = new google.maps.Marker({
                position: buoyLatLng,
                map: map,
                title: buoy.id
            });
            //google.maps.event.addListener(buoyMarker, "click", app.showSpecificBuoy(buoyMarker.title));
            google.maps.event.addListener(buoyMarker, "click", function () {
                console.log(this.title);
                console.log($location.url());
                var buoyUrl = "/buoy/" + this.title;
                console.log(buoyUrl);
                $scope.$apply(function() {
                    console.log(buoyUrl);
                    $location.path(buoyUrl);
                });
            });
        }

        // Stop the side bar from dragging when mousedown/tapdown on the map
        google.maps.event.addDomListener(document.getElementById('map'), 'mousedown', function(e) {
            e.preventDefault();
            return false;
        });

        $scope.map = map;
    };

    $scope.loadMap = function() {
        console.log('loadMap');
        initialize();
    };

    //google.maps.event.addDomListener(window, 'load', initialize);
    $scope.centerOnMe = function() {
        if(!$scope.map) {
            console.log('no scope map');
            return;
        }

        $scope.loading = $ionicLoading.show({
            content: 'Getting current location...',
            showBackdrop: false
        });

        navigator.geolocation.getCurrentPosition(function(pos) {
            $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
            $scope.loading.hide();
        }, function(error) {
            alert('Unable to get location: ' + error.message);
        });
    };


})

.controller('BuoyController', function($scope, $location, $stateParams, $http) {
    $scope.headerTitle = $stateParams.buoyId;
    $scope.leftButtons = [{
        type:"button-clear",
        content: "<i class='icon ion-ios7-arrow-back'></i>",
        tap: function(e) {
            $location.path("/map");
        }
    }];
    $scope.buoyId = $stateParams.buoyId;
    console.log('http://www.ndbc.noaa.gov/data/5day2/'+$scope.buoyId+'_5day.txt');
    $scope.buoyUrl = 'http://www.ndbc.noaa.gov/data/5day2/'+$scope.buoyId+'_5day.txt';
    
    $http({method: 'GET', url: $scope.buoyUrl})
    .success(function(data, status, headers, config) {
        // this callback will be called asynchronously
        // when the response is available
        console.log('success');
    })
    .error(function(data, status, headers, config) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        console.log('error');
    });




});