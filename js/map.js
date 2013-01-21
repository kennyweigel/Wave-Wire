function onLoad() {
    document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady() {
    navigator.geolocation.getCurrentPosition(onSuccess, onError,{'enableHighAccuracy':true,'timeout':10000});
}

//GEOLOCATION
var onSuccess = function(position) {
    //alert('Latitude: '  + position.coords.latitude   + '\n' +
    //      'Longitude: ' + position.coords.longitude  + '\n');

    var myLat = position.coords.latitude;
    var myLong = position.coords.longitude;

    //MAP
    var mapOptions = {
        center: new google.maps.LatLng(myLat, myLong),
        zoom: 7,
        mapTypeId: google.maps.MapTypeId.SATELLITE
    };

    var map = new google.maps.Map(document.getElementById("map_canvas"),
                                  mapOptions);

};

// onError Callback receives a PositionError object
//
function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}
