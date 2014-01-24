angular.module('Main', ['ionic'])

.controller('MainController', function($scope, Modal) {
  $scope.showSettings = function() {
    if(!$scope.settingsModal) {
     // Load the modal from the given template URL
      Modal.fromTemplateUrl('settings.html', function(modal) {
        $scope.settingsModal = modal;
        $scope.settingsModal.show();
      }, {
        // The animation we want to use for the modal entrance
        animation: 'slide-in-up'
      });
    } else {
      $scope.settingsModal.show();
    }
  }
})

.controller('SettingsCtrl', function($scope, Modal) {
  //$scope.settings = Settings.getSettings();

  // Watch deeply for settings changes, and save them
  // if necessary
  //$scope.$watch('settings', function(v) {
  //  Settings.save();
  //}, true);

  $scope.showMap = function() {
    if(!$scope.mapModal) {
     // Load the modal from the given template URL
      Modal.fromTemplateUrl('map.html', function(modal) {
        $scope.mapModal = modal;
        $scope.mapModal.show();
      }, {
        // The animation we want to use for the modal entrance
        animation: 'slide-in-up'
      });
    } else {
      $scope.mapModal.show();
    }
  }

  $scope.closeSettings = function() {
    $scope.modal.hide();
  };

})

.controller('MapCtrl', function($scope, Modal) {
  //$scope.settings = Settings.getSettings();

  // Watch deeply for settings changes, and save them
  // if necessary
  //$scope.$watch('settings', function(v) {
  //  Settings.save();
  //}, true);

  $scope.closeMap = function() {
    $scope.modal.hide();
  };

  function initialize() {
    console.log('map initialize');
    var mapOptions = {
      center: new google.maps.LatLng(43.07493,-89.381388),
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map"),
        mapOptions);

    // Stop the side bar from dragging when mousedown/tapdown on the map
    google.maps.event.addDomListener(document.getElementById('map'), 'mousedown', function(e) {
      e.preventDefault();
      return false;
    });

    $scope.map = map;
  }

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

    $scope.loading = Loading.show({
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