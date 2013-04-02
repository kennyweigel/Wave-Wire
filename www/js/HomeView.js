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

  this.renderFavorites = function() {
    console.log('render favs');
    $('#favBuoys').html(HomeView.favsTemplate(store.getFavorites()));
  }
  
  this.getTest = function() {
    console.log('getTest');
    var currentIDs = store.getFavorites();
    console.log('curentIDs:'+currentIDs);
    for (var i = 0; i < currentIDs.length; i++) {
      $.get('http://www.ndbc.noaa.gov/mobile/station.php?station='+currentIDs[i].id,function(data) {
        currentIDs[i].data = data;
        console.log(i+' '+data);
      });      
    }
    console.log('newIDs:'+currentIDs);
    store.setFavorites(currentIDs);
    this.renderFavorites();
    app.showAlert('done');
  }

  this.initialize();
}

HomeView.template = Handlebars.compile($('#home-tpl').html());
HomeView.favsTemplate = Handlebars.compile($('#favs-tpl').html());