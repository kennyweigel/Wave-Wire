

var MapView = function() {
  
  this.initialize = function() {
    this.el = $('<div/>');
      this.registerEvents();

  };

  this.registerEvents = function() {
    this.el.on('click','#mapRefresh',this.buoyMap);
  }

  this.render = function() {
      this.el.html(MapView.template());
      return this;
  };

  this.buoyMap = function(event) {
      navigator.geolocation.getCurrentPosition(onSuccess, onError,{'enableHighAccuracy':true,'timeout':10000});
  }

  //onSuccess callback receives a Position object
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
    
    //var navHeight = $('.navbar').height();
    //$('#mapCanvas').css({ top: navHeight });      
    
    var map = new google.maps.Map(document.getElementById("mapCanvas"),mapOptions);

    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'Me'
    });
  };
  //onError Callback receives a PositionError object
  var onError = function(error) {
      alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
  }
  
  this.initialize();
}

MapView.template = Handlebars.compile($('#map-tpl').html());