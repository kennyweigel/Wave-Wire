//adds slider when showing main the first time
//$(document).one('pageshow','#main',function(){
//    window.slider = new Swipe(document.getElementById('slider'));
//});
//when map is reached add map canvas and use geolocation
$(document).on('pageshow','#map',function() {
    var mapSize = {
        width: $(window).width(),
        height: $(window).height()
    };
    var headerHeight = $('#mapHeader').height();
    mapSize.height -= headerHeight;
    $('#mapHeader').after("<div id='mapCanvas' style='width:"+mapSize.width+"px;height:"+mapSize.height+"px'></div>");
    buoyMap();
});
//removes map canvas after leaving map page
$(document).on('tap','#mapHome',function() {
    $('#mapCanvas').remove();
})
//attempt to add a swipe element
//$(document).on('tap','#addSwipe',function() {
//    $('.swipe-wrap').append('<p>Hello</p>')
//})


//function buoyMap() {
//    document.addEventListener("deviceready", onDeviceReady, false);
//}

function buoyMap() {
    navigator.geolocation.getCurrentPosition(onSuccess, onError,{'enableHighAccuracy':true,'timeout':10000});
}

//onSuccess callback receives a Position object
function onSuccess(position) {
    
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

//onError Callback receives a PositionError object
function onError(error) {
    alert('code: '    + error.code    + '\n' +
        'message: ' + error.message + '\n');
}
