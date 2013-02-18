function buoyMap() {
    document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady() {
    navigator.geolocation.getCurrentPosition(onSuccess, onError,{'enableHighAccuracy':true,'timeout':10000});
}

//GEOLOCATION
var onSuccess = function(position) {
    
    var myLat = position.coords.latitude;
    var myLng = position.coords.longitude;
    var myLatLng = new google.maps.LatLng(myLat,myLng)
    
    //MAP
    var mapOptions = {
        center: myLatLng,
        zoom: 7,
        mapTypeId: google.maps.MapTypeId.TERRAIN,
        disableDefaultUI: true
    };

    var map = new google.maps.Map(document.getElementById("mapCanvas"),mapOptions);

    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'Me'
      });

};

// onError Callback receives a PositionError object
function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}
