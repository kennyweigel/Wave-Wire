angular.module("Main")

.controller("MapController", function($scope, $location, $ionicLoading, BuoyService) {
    var geoSuccess = function(position) {
        var myLat = position.coords.latitude,
            myLng = position.coords.longitude,
            myLatLng = new google.maps.LatLng(myLat, myLng),
            mapOptions = {
                center: myLatLng,
                zoom: 7,
                mapTypeId: google.maps.MapTypeId.TERRAIN,
                disableDefaultUI: true
            },
            allBuoys = BuoyService.all(),
            allBuoysLength = allBuoys.length,
            i = 0,
            buoy = null,
            buoyLatLng = null,
            buoyMarker = null,
            map = {};

            map = new google.maps.Map(document.getElementById("map"), mapOptions),
            $scope.loading.hide();

            for (i = 0; i < allBuoysLength; i += 1) {
                buoy = allBuoys[i];
                buoyLatLng = new google.maps.LatLng(buoy.lat, buoy.lng);
                buoyMarker = new google.maps.Marker({
                    position: buoyLatLng,
                    map: map,
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
        geoError = function(error) {
            $scope.loading.hide();
            alert("code: " + error.code + "\n" + "message: " + error.message + "\n");
        },
        geoOptions = {
            "enableHighAccuracy": true,
            "timeout": 10000
        };

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
        
        navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);
    };
});