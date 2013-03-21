

var MapView = function() {
  
  this.initialize = function() {
    this.el = $('<div/>');
    this.registerEvents();
  }

  this.registerEvents = function() {
    this.el.on('click','#mapRefresh',this.buoyMap);
  }

  this.render = function() {
      this.el.html(MapView.template());
      return this;
  }

  this.buoyMap = function() {
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
    }      
    
    var map = new google.maps.Map(document.getElementById("mapCanvas"),mapOptions);

    var marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      title: 'Me'
    });    
    
    markBuoys(map);
  }
  //onError Callback receives a PositionError object
  function onError(error) {
      alert('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n');
  }

  function markBuoys(map) {
    for (var i=0; i<buoys.length; i++) {
      var buoy = buoys[i];
      var buoyLatLng = new google.maps.LatLng(buoy.lat,buoy.lng);
      var buoyMarker = new google.maps.Marker({
        position: buoyLatLng,
        map: map,
        title: buoy.num,
        icon: 'img/shipwreck.png'
      });
    }    
  }

  this.initialize();
}

MapView.template = Handlebars.compile($('#map-tpl').html());