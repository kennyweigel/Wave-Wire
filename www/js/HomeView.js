var HomeView = function(store) {

  this.initialize = function() {
    this.el = $('<div/>');
    this.registerEvents();
  }

  this.registerEvents = function() {
    this.el.on('submit','#test',app.validateBuoy);
    //this is added for testing on a non touch device
    this.el.on('dblclick','.accordion-toggle',app.removeFavorite);
    this.el.on('swipe','.accordion-toggle',app.removeFavorite);
    this.el.on('click','#testBtn',this.getTest);
  }

  this.render = function() {
    this.el.html(HomeView.template());
    return this;
  }

  this.renderFavorites = function(testFavs) {
    console.log('render favs');
    alert('render favs');
    $('#favBuoys').html(HomeView.favsTemplate(testFavs));
  }
  
  this.getTest = function() {
    //alert('getTest');
    var currentIDs = store.getFavorites();
    
    for (var i = 0; i < currentIDs.length; i++) {
      updateInit('http://www.ndbc.noaa.gov/mobile/station.php?station='+currentIDs[i].id,currentIDs[i].id);
    }
  }

  var updateInit = function(url,EXTRA) {
    //alert('updateInit');  
    $.get(url,function(html,status){
      update(html,status,EXTRA);
    });

  }
    
  var update = function(html, status, EXTRA) {
    alert('update');
    
    if(status != 'success') {
      //alert('GET was unsuccessful');
      return;
    }
    
    locals = store.getFavorites();
    for (var j=0; j < locals.length; j++) {
      if (locals[j].id == EXTRA) {
        locals[j].data = html;
        //alert(html);
        app.homePage.renderFavorites(locals);
        //alert('rendered');
        store.setFavorites(locals);
        //alert('set favs');
        break;
      }
    }
  }
  
  this.initialize();
}

var testHTML = 
'<?xml version="1.0" encoding="utf-8" ?>\
<!DOCTYPE html PUBLIC "-//WAPFORUM//DTD XHTML Mobile 1.2//EN" "http://www.openmobilealliance.org/tech/DTD/xhtml-mobile12.dtd">\
<html xmlns="http://www.w3.org/1999/xhtml">\
<head>\
<title>NDBC/44007</title>\
<link href="ndbc.css" rel="stylesheet" type="text/css" media="all" />\
</head>\
<body>\
<h1><img src="noaa_logo.gif" width="40" height="40" alt="NOAA Logo" class="logo" /> NDBC/44007</h1><p>43.531N 70.144W</p>\
<h2>Weather Conditions</h2>\
<p>7:50 am EDT<br />\
1150 GMT 04/07/13<br />\
Seas: 2.3 ft<br />\
Peak Period: 12 sec<br />\
Pres: 30.31 rising<br />\
Air Temp: 40.1 &#176;F<br />\
Water Temp: 40.1 &#176;F<br />\
</p>\
<p><a href="/mobile/">Main Page</a><br />Feedback: <a href="mailto:webmaster.ndbc@noaa.gov">webmaster.ndbc@noaa.gov</a></p>\
</body>\
</html>'

HomeView.template = Handlebars.compile($('#home-tpl').html());
HomeView.favsTemplate = Handlebars.compile($('#favs-tpl').html());