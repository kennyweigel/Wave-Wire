var HomeView = function(store) {

  this.initialize = function() {
    this.el = $("<div/>");
    this.registerEvents();
  }

  this.registerEvents = function() {
    this.el.on("click","#testBtn",this.getTest);
  }

  this.render = function() {
    this.el.html(HomeView.template());
    return this;
  }

  this.renderFavorites = function(testFavs) {
    console.log("render favs");
    //populates the favs slider
    $("#theList").html(HomeView.favsTemplate(testFavs));
    //populates the favs nav
    $("#indicator").html(HomeView.navTemplate(testFavs));
    //sets width of scroller to appropriate width
    $("#scroller").width(testFavs.length * app.screenWidth);
    //sets width of scroller pages to appropriate width
    $("#scroller li").width(app.screenWidth);
    //sets height of scroller to appropriate height
    $("#wrapper").height(app.screenHeight - 70);
    $(".slide").height(app.screenHeight - 110);
    //sets first li bullet active
    $("#indicator>:first-child").addClass("active");

    //if the iscroll object doesn't exist create it
    if (!this.myScroll) {
      this.myScroll = new iScroll("wrapper", {
        snap: true,
        momentum: false,
        hScrollbar: false,
        onScrollEnd: function () {
          document.querySelector("#indicator > li.active").className = "";
          document.querySelector('#indicator > li:nth-child(' + (this.currPageX+1) + ')').className = 'active';
        }
      });
    }
    //if the iscroll object does exist just refresh it
    else {
      this.myScroll.refresh();
    }
  }

  this.refreshFavorites = function(testFavs) {
    //populates the favs slider
    $("#theList").html(HomeView.favsTemplate(testFavs));
    //sets height of scroller to appropriate height
    $("#wrapper").height(app.screenHeight - 70);
    $(".slide").height(app.screenHeight - 110);
  }

  this.getTest = function() {
    var currentIds = store.getFavorites();
    var activeAJAX = 0;

    for (var i = 0; i < currentIds.length; i++) {
      //increments the number of active AJAX requests
      activeAJAX++;
      updateInit('http://www.ndbc.noaa.gov/mobile/station.php?station='+currentIds[i].id,currentIds[i].id);
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
      
      for (var j=0; j < currentIds.length; j++) {
        if (currentIds[j].id == EXTRA) {
          currentIds[j].data = app.processBuoyData(html);
          store.setFavorites(currentIds);
          if (!activeAJAX) {
            app.homePage.refreshFavorites(currentIds);
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
HomeView.navTemplate = Handlebars.compile($("#nav-tpl").html());