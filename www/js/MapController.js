angular.module("Main")

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
});