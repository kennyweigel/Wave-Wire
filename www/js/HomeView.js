var HomeView = function(store) {

  this.initialize = function() {
    this.el = $("<div/>");
  }

  this.registerEvents = function() {
    this.el.on("click","#homePageRefresh",this.homePageRefresh);
    this.el.on("click","#addBuoySlide",this.hashChangeSearch);
  }

  this.render = function() {
    this.el.html(HomeView.template(app.store.getFavorites()));
    return this;
  }

  this.resize = function() {
    var testFavs = app.store.getFavorites();
    $("#scroller").width((testFavs.length + 1) * app.screenWidth);
    //sets width of scroller pages to appropriate width
    $("#scroller li").width(app.screenWidth);
    //sets each slide to appropriate size
    $(".slide").height(app.screenHeight - 110);
    $(".slide").width(app.screenWidth - 40);
    //sets first li bullet active
    $("#indicator>:first-child").addClass("active");
    this.myScroll = new iScroll("wrapper", {
      snap: true,
      momentum: false,
      hScrollbar: false,
      onScrollEnd: function () {
        document.querySelector("#indicator > li.active").className = "";
        document.querySelector("#indicator > li:nth-child(" + (this.currPageX+1) + ")").className = "active";
      }
    });
  }

  this.homePageRefresh = function() {
    var currentIds = app.store.getFavorites();
    var activeAJAX = 0;
    $("#homePageRefresh > i").addClass("icon-spin");
    var currentIdsLength = currentIds.length;
    for (var i = 0; i < currentIdsLength; i++) {
      //increments the number of active AJAX requests
      activeAJAX++;
      updateInit("http://www.ndbc.noaa.gov/mobile/station.php?station="+currentIds[i].id, currentIds[i].id);
    }
    
    function updateInit(url,EXTRA) {
      $.get(url,function(html,status) {
        update(html,status,EXTRA);
      });
    }
    
    function update(html,status,EXTRA) {
      activeAJAX--;
      // NEED TO FIX //
      if(status != 'success') {
        alert('GET was unsuccessful');
        $("#homePageRefresh > i").removeClass("icon-spin");
        return;
      }
      else {
        for (var j = 0; j < currentIdsLength; j++) {
          if (currentIds[j].id == EXTRA) {
            currentIds[j].data = app.processBuoyData(html);
            store.setFavorites(currentIds);
            if (!activeAJAX) {
              $("#homePageRefresh > i").removeClass("icon-spin");
              app.homePage.render();
              $("body").html(app.homePage.el);
              app.homePage.resize();
              break;
            }
            break;
          }
        }
      }
    }
  }
  
  this.hashChangeSearch = function() {
    if (app.store.getFavorites().length < 10) {
      window.location.hash = "search";
    }
    else {
      app.showAlert("Only 10 buoys may be added to your Favorites","Favorites Limit Reached");
    }
  }

  this.initialize();
}

HomeView.template = Handlebars.compile($('#home-tpl').html());
//HomeView.favsTemplate = Handlebars.compile($('#favs-tpl').html());
//HomeView.navTemplate = Handlebars.compile($("#nav-tpl").html());