var SearchView = function() {

  this.initialize = function() {
    this.el = $("<div/>");
  }

  this.registerEvents = function() {
    this.el.on("click","#searchBackBtn",this.hashChangeBack);
    this.el.on("click","#searchGeolocation", this.getClosestBuoys); 
    //browser supports touch events
    if (document.documentElement.hasOwnProperty('ontouchstart')) {
      this.el.on('touchstart', '.closestBuoys', function(event) {
        $(event.target).addClass('tappable-active');
      });
      this.el.on('touchend', '.closestBuoys', function(event) {
        $(event.target).removeClass('tappable-active');
        app.searchPage.confirmClosestBuoy($(this).attr("id").substring(0,5));
      });
    } 
    //browser only supports mouse events
    else {
      this.el.on('mousedown', '.closestBuoys', function(event) {
        $(event.target).addClass('tappable-active');
      });
      this.el.on('mouseup', '.closestBuoys', function(event) {
        $(event.target).removeClass('tappable-active');
        app.searchPage.confirmClosestBuoy($(this).attr("id").substring(0,5));
      });
    }
  }

  this.render = function() {
    this.el.html(SearchView.template());
    return this;
  }

  this.confirmClosestBuoy = function(currentId) {
    //this if only effects a desktop browser, by default the touchend event fires
    //on the same element as the touchstart even if it is at a different location
    if (app.searchPage.selectDownElement == app.searchPage.selectUpElement) {
      if (app.store.getFavorites().length < 10) {
        app.searchPage.currentId = currentId;
        app.showConfirm(
          "Are you sure you want to add buoy " + app.searchPage.currentId + "?",
          app.searchPage.addClosestBuoy,
          "Favorite",
          ["Yes", "Cancel"]
        );
        return;
      }
      else {
        app.showAlert("Only 10 buoys may be added to your Favorites.","Favorites");
      }
    }
    else {
      return;
    }
  }

  this.addClosestBuoy = function(buttonIndex) {
    if (buttonIndex == 1) {
      app.addFavBuoy(null,app.searchPage.currentId);
      return;
    }
    else {
      return;
    }
  }

  this.getClosestBuoys = function() {
    $("#closestBuoysTable").html("<tbody><tr><td>Getting Current Location...</td></tr></tbody>");
    navigator.geolocation.getCurrentPosition(onGeolocationSuccess, onGeolocationError,{'enableHighAccuracy':true,'timeout':10000});
    return;
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

  this.hashChangeBack = function() {
    window.location.hash = app.previousHash;
  }

  this.initialize();
}

SearchView.template = Handlebars.compile($("#search-tpl").html());
SearchView.closestBuoysTable = Handlebars.compile($("#closestBuoysTable-tpl").html());