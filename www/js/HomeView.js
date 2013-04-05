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
  /*
  this.getTest = function() {
    alert('getTest');
    var currentIDs = store.getFavorites();
    alert('curentIDs:'+currentIDs);
    for (var i = 0; i < currentIDs.length; i++) {
      alert(i);
      updateInit('http://www.ndbc.noaa.gov/mobile/station.php?station='+currentIDs[i].id,currentIDs[i].id);
    }

    function updateInit(url,EXTRA) {
      alert('in updateInit');
      $.get(url,function(html,status){
        update(html, status, EXTRA);
      });
    }
    
    function update (html, status, EXTRA) {
      alert('in update');
      alert(html);
      alert(status);
      if(status != 'success') {
        alert('DNE success');
        return;
      }
      
      locals = store.getFavorites();
      alert(locals);
      for (var j=0; j < locals.length; j++) {
        if (locals[j].id == EXTRA) {
          alert('local == id');
          locals[j].data = html;
          alert('locals new 'locals[j].data);
          store.setFavorites(locals);
          this.renderFavorites();
          alert('rendered');
          break;
        }
      }
    }
  }
  */

  this.initialize();
}

HomeView.template = Handlebars.compile($('#home-tpl').html());
HomeView.favsTemplate = Handlebars.compile($('#favs-tpl').html());