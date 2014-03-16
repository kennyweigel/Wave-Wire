angular.module("Main")

.controller("MapController", function($scope, $rootScope, $location, $ionicLoading, BuoyListService) {
    var initializeMap = function(position) {
            var myLat = null,
                myLng = null,
                myLatLng = null,
                defaultLatLng = null,
                mapOptions = {},
                allBuoys = BuoyListService.all(),
                allBuoysLength = allBuoys.length,
                i = 0,
                buoy = null,
                buoyLatLng = null,
                buoyMarker = null;

            if (position) {
                myLat = position.coords.latitude;
                myLng = position.coords.longitude;
                myLatLng = new google.maps.LatLng(myLat, myLng);
                mapOptions = {
                    center: myLatLng,
                    zoom: 7,
                    mapTypeId: google.maps.MapTypeId.TERRAIN,
                    disableDefaultUI: true
                };
            } else {
                defaultLatLng = new google.maps.LatLng(38, -75);
                mapOptions = {
                    center: defaultLatLng,
                    zoom: 4,
                    mapTypeId: google.maps.MapTypeId.TERRAIN,
                    disableDefaultUI: true
                };
            }

            $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

            for (i = 0; i < allBuoysLength; i += 1) {
                buoy = allBuoys[i];
                buoyLatLng = new google.maps.LatLng(buoy.lat, buoy.lng);
                buoyMarker = new google.maps.Marker({
                    position: buoyLatLng,
                    map: $scope.map,
                    title: buoy.id
                });
                google.maps.event.addListener(buoyMarker, "click", function () {
                    var buoyUrl = "/buoy/" + this.title;
                    $scope.$apply(function() {
                        $location.path(buoyUrl);
                    });
                });
            }

            // Stop the side bar from dragging when mousedown/tapdown on the map
            google.maps.event.addDomListener(document.getElementById("map"), "mousedown", function(e) {
                e.preventDefault();
                return false;
            });
        },
        geoSuccess = function(position) {
            initializeMap(position);
            $scope.loading.hide();
        },
        geoError = function(error) {
            $scope.loading.hide();
            if (error.code == 1) {
                alert("TODO user denied geolocation");
            } else {
                alert("code: " + error.code + "\n" + "message: " + error.message + "\n");
            }

            if (!$scope.map) {
                console.log('init error map');
                initializeMap(null);
            }
        },
        geoOptions = {
            "enableHighAccuracy": true,
            "timeout": 10000
        },
        geoCenterSuccess = function(position) {
            var myLat = position.coords.latitude,
                myLng = position.coords.longitude,
                myLatLng = new google.maps.LatLng(myLat, myLng);

            $rootScope.userData.position = position;            
            $scope.map.setCenter(myLatLng);
            $scope.map.setZoom(7);
            $scope.loading.hide();
        },
        init = function() {
            if ($rootScope.userData.position) {
                initializeMap($rootScope.userData.position);
            } else {
                initializeMap(null);
            }
        };

    $scope.map = null;
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
            $scope.start();
        }
    }];
    $scope.start = function() {
        $scope.loading = $ionicLoading.show({
            content: 'Getting current location...',
            showBackdrop: false
        });
        
        navigator.geolocation.getCurrentPosition(geoCenterSuccess, geoError, geoOptions);
    };

    init();

});