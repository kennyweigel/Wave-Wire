var SearchView = function(store) {

  this.initialize = function() {
    this.el = $("<div/>");
    this.registerEvents();
  }

  this.registerEvents = function() {
    this.el.on("click",".searchRegion",this.regionCollapsible);
    this.el.on("submit","#test",app.validateBuoy);
    this.el.on("click","#searchBackBtn",this.hashChangeBack);
    this.el.on("click",".searchId",this.selectId);
    this.el.on("click","#searchPosTest", this.getClosestBuoys);
  }

  this.selectId = function() {
  }

//new
  this.getClosestBuoys = function() {
    navigator.geolocation.getCurrentPosition(onSuccess, onError,{'enableHighAccuracy':true,'timeout':10000});
  }

  var onSuccess = function(position) {
    var myLat = position.coords.latitude;
    var myLng = position.coords.longitude;
    console.log(myLat + " " + myLng);
    console.log(listNortheastUsa.length);
    listNortheastUsaLen = listNortheastUsa.length;
    // create array of listNortheast buoys objects and distances
    this.arrayTest = [];
    var distance;
    for (var i = 0; i < listNortheastUsaLen; i++) {
      distance = getDistanceFromLatLonInKm(myLat,myLng,listNortheastUsa[i].lat,listNortheastUsa[i].lng);
      this.arrayTest.push({"id":listNortheastUsa[i].id, "name":listNortheast[i].name, "distance":distance});
    }

    for (var i = 0; i < listNortheastUsaLen; i++) {
      this.arrayTest.sort(function(obj1, obj2) {
      return obj1.distance - obj2.distance;
      }
    }


    console.log(this.arrayTest.slice(0,10));
  }

  function onError(error) {
    alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
  }

  function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
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

  function deg2rad(deg) {
    return deg * (Math.PI/180)
  }
//end new

  this.regionCollapsible = function() {
    var newTableHtml;

    //if selected region is already expanded reset the table to default
    if ($(this).hasClass("regionExpanded")) {
      $("#searchBuoyTable").html(SearchView.searchTable(regions));
    }

    else {
      //if any other regions are expanded
      if ($("tr").hasClass("regionExpanded")) {
        //default
        var newTableHtml = SearchView.searchTable(regions);
        //index of selected region
        var indexRegion = newTableHtml.indexOf($(this).attr("id"));
        //index of end of class attribute for selected region
        var indexClass = newTableHtml.indexOf("searchRegion") + 12;
        //index of end of </tr> for selected region
        var indexCloseTr = newTableHtml.indexOf("</tr>",indexRegion) + 4;//19
      
        var html1 = newTableHtml.substring(0,indexClass);
        var html2 = newTableHtml.substring(indexClass,indexCloseTr);
        var html3 = newTableHtml.substring(indexCloseTr);

        $("#searchBuoyTable").html(html1 + " regionExpanded" + html2 + SearchView.tableBuoys(window[$(this).attr('id')]) + html3);
      }
      
      else {
        $(this).after(SearchView.tableBuoys(window[$(this).attr('id')]));
        $(this).addClass("regionExpanded");
      }
    }
  }

  this.render = function() {
    this.el.html(SearchView.template());
    $("body").html(this.el);
    $("#searchBuoyTable").html(SearchView.searchTable(regions));
  }

  this.favListSwipe = function() {
    var currentId = $(this).attr('id').substring(0,5);
    if (_deleteBtnExists()) {
      $(".deleteBtn").remove();
    }
    else {
      $("#"+currentId+"-li>h3").append("<button id='"+currentId+"-delete' class='deleteBtn btn btn-danger pull-right'>Delete</button>");
    }
  }

  this.resizeElements = function() {
    $(".form-search").width(app.screenWidth - 20);
    $(".search-query").width(app.screenWidth - 116);
    $("#searchBuoyTable").width(app.screenWidth - 20);
  }

  var _deleteBtnExists = function() {
    if ($(".deleteBtn").length) {
      return 1;
    }
    else {
      return 0;
    }
  }

  this.hashChangeBack = function() {
    window.location.hash = app.previousHash;
  }

  this.initialize();
}


SearchView.template = Handlebars.compile($("#search-tpl").html());
SearchView.searchTable = Handlebars.compile($("#searchTable-tpl").html());
SearchView.tableBuoys = Handlebars.compile($("#tableBuoys-tpl").html());