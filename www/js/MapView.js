var MapView = function() {
  
  this.initialize = function() {
    this.el = $('<div/>');
    this.registerEvents();
  }

  this.registerEvents = function() {
    this.el.on("click","#mapRefresh",this.buoyMap);
    this.el.on("click","#mapMenu",app.hashChangeMenu);
  }

  this.render = function() {
    this.el.html(MapView.template());
    return this;
  }

  this.buoyMap = function() {
    $("#mapRefresh > i").addClass("icon-spin");
    navigator.geolocation.getCurrentPosition(onSuccess, onError,{'enableHighAccuracy':true,'timeout':10000});
  }

  //onSuccess callback receives a Position object
  function onSuccess(position) {

    var myLat = position.coords.latitude;
    var myLng = position.coords.longitude;
    var myLatLng = new google.maps.LatLng(myLat,myLng);
    var mapOptions = {
        center: myLatLng,
        zoom: 7,
        mapTypeId: google.maps.MapTypeId.TERRAIN,
        disableDefaultUI: true
    }      
    
    var map = new google.maps.Map(document.getElementById("mapCanvas"),mapOptions);

    var regionsLength = regions.length;
    for (var i = 0; i < regionsLength; i++) {
      var specificRegion = window[regions[i].id];
      var specificRegionLength = specificRegion.length;
      for (var j = 0; j < specificRegionLength; j++) {
        var buoy = specificRegion[j];
        var buoyLatLng = new google.maps.LatLng(buoy.lat,buoy.lng);
        var buoyMarker = new google.maps.Marker({
          position: buoyLatLng,
          map: map,
          title: buoy.id,
          icon: 'img/shipwreck_75.png'
        });
        google.maps.event.addListener(buoyMarker, "click", function() {
          //THIS IS FOR DEBUG ONLY
          $("#myModal").modal();
          //alert(this.title);
          //
        });
      } 
    }
    $("#mapRefresh > i").removeClass("icon-spin");
  }
  
  //onError Callback receives a PositionError object
  function onError(error) {
    $("#mapRefresh > i").removeClass("icon-spin");
    alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
  }

  this.initialize();
}

MapView.template = Handlebars.compile($('#map-tpl').html());