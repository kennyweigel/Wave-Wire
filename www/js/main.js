angular.module("Main", ["ionic","Main.BuoyService","Main.LocalStorageService","Main.BuoyDataService"])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    // setup an abstract state for the tabs directive
    .state("home", {
      url: "/home",
      templateUrl: "templates/home.html",
      controller: "HomeController"
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
  $urlRouterProvider.otherwise("/home");

})

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
})

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
})

.controller("MapController", function($scope, $location, $ionicLoading, BuoyService) {
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

.controller('BuoyController', function($scope, $location, $stateParams, $http, BuoyService, LocalStorageService, BuoyDataService) {
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
    //$scope.buoyUrl = 'http://www.ndbc.noaa.gov/data/5day2/'+$scope.buoyId+'_5day.txt';
    //for testing
    $scope.buoyUrl = 'http://localhost:4444/testData.txt';

    $scope.addToFavorites = function() {
        LocalStorageService.add($scope.buoyId);
    };
    $scope.buoyName = BuoyService.get($stateParams.buoyId).name;

    $scope.update = function() {
        BuoyDataService.get($scope.buoyId)
        .success(function(data, status, headers, config) {
            var removeNull= function(data) {
                var index = data.indexOf("");
                if (index > -1) {

                    data.splice(index, 1);
                    removeNull(data);
                }
                return data;
            };
            data = data.split('\n');
            data = data[2];
            data = data.split(" ");
            data = removeNull(data);
            data = {
                "year": data[0],
                "month": data[1],
                "day": data[2],
                "hour": data[3],
                "minute": data[4],
                "wind-direction": data[5],
                "wind-speed": data[6],
                "wind-gust": data[7],
                "wave-height": data[8],
                "wave-dominant-period": data[9],
                "wave-average-period": data[10],
                "median-wave-direction": data[11],
                "pressure": data[12],
                "air-temp": data[13],
                "water-temp": data[14],
                "dew-point": data[15],
                "visibilty": data[16],
                "ptdy?": data[17],
                "tide": data[18]
            };
            //Dummy test data for now
            $scope.testData = data.month;
        })
        .error(function(data, status, headers, config) {
            alert("error");
        });
    };
});