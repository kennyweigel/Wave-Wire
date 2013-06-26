var SearchView = function(store) {

  this.initialize = function() {
    this.el = $("<div/>");
  }

  this.registerEvents = function() {
    this.el.on("submit","#searchForm",this.validateBuoy);
    this.el.on("click","#searchBackBtn",this.hashChangeBack);
    this.el.on("click","#searchGeolocation", this.getClosestBuoys);
    if (document.documentElement.hasOwnProperty("ontouchstart")) {
      // ... if yes: register touch event listener to change the "selected" state of the item
      this.el.on("touchstart", ".closestBuoys", function(event) {
        $(event.target).addClass("tappable-active");
      });
      this.el.on("touchend", ".closestBuoys", function(event) {
        $(event.target).removeClass("tappable-active");
        app.searchPage.selectClosestBuoy($(this).attr("id").substring(0,5));
      });
    } 
    else {
      // ... if not: register mouse events instead
      this.el.on("mousedown",".closestBuoys", function() {
        $(this).addClass("tappable-active");
      });
      this.el.on("mouseup",".closestBuoys", function() {
        $(this).removeClass("tappable-active");
        app.searchPage.selectClosestBuoy($(this).attr("id").substring(0,5));
      });
    }
  }

  this.render = function() {
    this.el.html(SearchView.template());
    return this;
  }

  this.selectClosestBuoy = function(selectedBuoy) {
    app.addFavBuoy(null,selectedBuoy);
  }

  this.getClosestBuoys = function() {
    $("#closestBuoysTable").html("<tbody><tr><td>Getting Current Location...</td></tr></tbody>");
    navigator.geolocation.getCurrentPosition(onGeolocationSuccess, onGeolocationError,{'enableHighAccuracy':true,'timeout':10000});
  }

  var onGeolocationSuccess = function(position) {
    var myLat = position.coords.latitude;
    var myLng = position.coords.longitude;
    var regionSpecific;
    var regionSpecificLength;
    var distance;
    var allBuoys = new Array();
    var regionsLength = regions.length;    
    for (var i = 0; i < regionsLength; i++) {
      regionSpecific = window[regions[i].id];
      regionSpecificLength = regionSpecific.length;
      
      for (var j = 0; j < regionSpecificLength; j++) {
        distance = getDistanceFromLatLonInKm(myLat,myLng,regionSpecific[j].lat,regionSpecific[j].lng);
        allBuoys.push({"id":regionSpecific[j].id, "name":regionSpecific[j].name, "distance":distance});
      }
    }
    allBuoysLength = allBuoys.length;
    for (var i = 0; i < allBuoysLength; i++) {
      allBuoys.sort(function(buoy1, buoy2) {
        return buoy1.distance - buoy2.distance;
      });
    }
    allBuoys = allBuoys.slice(0,10);
    $("#closestBuoysTable").html(SearchView.closestBuoysTable(allBuoys));
  }

  var onGeolocationError = function(error) {
    console.log(error);
    $("#closestBuoysTable").html("<tbody><tr><td>Geolocation failed, check your network connection and privacy settings.</td></tr></tbody>");
  }

  var getDistanceFromLatLonInKm = function(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
  }

  var deg2rad = function(deg) {
    return deg * (Math.PI/180)
  }

  this.validateBuoy = function () {
    //form input value
    var input = $("#searchInput");
    var inputVal = input.val().toUpperCase();
    app.addFavBuoy(input,inputVal);
  }

  this.hashChangeBack = function() {
    window.location.hash = app.previousHash;
  }

  this.initialize();
}

SearchView.template = Handlebars.compile($("#search-tpl").html());
SearchView.closestBuoysTable = Handlebars.compile($("#closestBuoysTable-tpl").html());