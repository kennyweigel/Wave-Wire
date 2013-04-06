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
    alert('render favs');
    $('#favBuoys').html(HomeView.favsTemplate(store.getFavorites()));
  }
  
  this.getTest = function() {
    var currentIDs = store.getFavorites();
    
    for (var i = 0; i < currentIDs.length; i++) {
      updateInit('http://www.ndbc.noaa.gov/mobile/station.php?station='+currentIDs[i].id,currentIDs[i].id);
    }

    function updateInit(url,EXTRA) {
      $.get(url,function(html,status){
        update(html, status, EXTRA);
      });
    }
    
    function update (html, status, EXTRA) {
      if(status != 'success') {
        alert('GET was unsuccessful');
        return;
      }
      
      locals = store.getFavorites();
      for (var j=0; j < locals.length; j++) {
        if (locals[j].id == EXTRA) {
          locals[j].data = html;
          store.setFavorites(locals);
          alert('set favs');
          this.renderFavorites();
          alert('rendered');
          break;
        }
      }
    }
  }
  

  this.initialize();
}

HomeView.template = Handlebars.compile($('#home-tpl').html());
HomeView.favsTemplate = Handlebars.compile($('#favs-tpl').html());