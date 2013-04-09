var HomeView = function(store) {

  this.initialize = function() {
    this.el = $('<div/>');
    this.registerEvents();
  }

  this.registerEvents = function() {
    this.el.on('submit','#test',app.validateBuoy);
    this.el.on('click','#testBtn',this.getTest);
  }

  this.render = function() {
    this.el.html(HomeView.template());
    return this;
  }

  this.renderFavorites = function(testFavs) {
    console.log('render favs');
    $('#swipeWrap').html(HomeView.favsTemplate(testFavs));
    var elem = document.getElementById('mySwipe');
    window.mySwipe = Swipe(elem, {
      // startSlide: 4,
      // auto: 3000,
       continuous: false,
      // disableScroll: true,
      // stopPropagation: true,
      // callback: function(index, element) {},
      // transitionEnd: function(index, element) {}
    });
    for (var i = 0; i < testFavs.length; i++) {
      $('#'+testFavs[i].id+'-data').html(testFavs[i].data);
    }
  }
  
  this.getTest = function() {
    var currentIDs = store.getFavorites();
    
    for (var i = 0; i < currentIDs.length; i++) {
      updateInit('http://www.ndbc.noaa.gov/mobile/station.php?station='+currentIDs[i].id,currentIDs[i].id);
    }
    
    function updateInit(url,EXTRA) {
      $.get(url,function(html,status){
        update(html,status,EXTRA);
      });
    }
    
    function update(html,status,EXTRA) {
      if(status != 'success') {
        alert('GET was unsuccessful');
        return;
      }
      
      locals = store.getFavorites();
      for (var j=0; j < locals.length; j++) {
        if (locals[j].id == EXTRA) {
          locals[j].data = app.processBuoyData(html);
          store.setFavorites(locals);
          app.homePage.renderFavorites(locals);
          break;
        }
      }
    }
  }

  this.initialize();
}

HomeView.template = Handlebars.compile($('#home-tpl').html());
HomeView.favsTemplate = Handlebars.compile($('#favs-tpl').html());