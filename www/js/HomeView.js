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
    this.mySwipe = Swipe(elem, {
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
  
  this.killSwipe = function() {
    this.mySwipe.kill();
    this.mySwipe = null;
    $('#swipeWrap').html('');
  }

  this.getTest = function() {
    var currentIDs = store.getFavorites();
    var activeAJAX = 0;

    for (var i = 0; i < currentIDs.length; i++) {
      //increments the number of active AJAX requests
      activeAJAX++;
      updateInit('http://www.ndbc.noaa.gov/mobile/station.php?station='+currentIDs[i].id,currentIDs[i].id);
    }
    
    function updateInit(url,EXTRA) {
      $.get(url,function(html,status){
        update(html,status,EXTRA);
      });
    }
    
    function update(html,status,EXTRA) {
      activeAJAX--;
      if(status != 'success') {
        alert('GET was unsuccessful');
        return;
      }
      
      for (var j=0; j < currentIDs.length; j++) {
        if (currentIDs[j].id == EXTRA) {
          currentIDs[j].data = app.processBuoyData(html);
          store.setFavorites(currentIDs);
          if (!activeAJAX) {
            if (app.homePage.mySwipe) {
              app.homePage.killSwipe();
            }
            app.homePage.renderFavorites(currentIDs);
            break;
          }
          break;
        }
      }
    }
  }

  this.initialize();
}

HomeView.template = Handlebars.compile($('#home-tpl').html());
HomeView.favsTemplate = Handlebars.compile($('#favs-tpl').html());