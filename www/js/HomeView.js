var HomeView = function() {

  this.initialize = function() {
    this.el = $("<div/>");
  }

  this.registerEvents = function() {
    this.el.on("click","#homeRefresh",this.homeRefresh);
    this.el.on("click","#addBuoySlide",app.hashChangeSearch);
    this.el.on("click","#homeMenu",app.hashChangeMenu);
  }

  this.render = function() {
    this.el.html(HomeView.template());
    return this;
  }

  this.renderFavorites = function() {
    $("#scroller").html(HomeView.scrollerTemplate(app.store.getFavorites()));
    $("#indicator").html(HomeView.indicatorTemplate(app.store.getFavorites()));
  }

  this.resize = function() {
    var testFavs = app.store.getFavorites();
    $("#scroller").width((testFavs.length + 1) * app.screenWidth);
    //sets width of scroller pages to appropriate width
    $("#scroller li").width(app.screenWidth);
    //sets each slide to appropriate size
    $(".slide").height(app.screenHeight - 110);
    $(".slide").width(app.screenWidth - 40);
    this.myScroll = new iScroll("wrapper", {
      snap: true,
      momentum: false,
      hScrollbar: false,
      onScrollEnd: function () {
        document.querySelector("#indicator > li.active").className = "";
        document.querySelector("#indicator > li:nth-child(" + (this.currPageX+1) + ")").className = "active";
      }
    });
    //sets scroller to first page
    this.myScroll.scrollToPage(0);
    //sets first li bullet active
    $("#indicator>li").removeClass("active");
    $("#indicator>:first-child").addClass("active");
  }

  this.homeRefresh = function() {
    var currentIds = app.store.getFavorites();
    var activeAJAX = 0;
    $("#homeRefresh > i").addClass("icon-spin");
    var currentIdsLength = currentIds.length;
    for (var i = 0; i < currentIdsLength; i++) {
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
        $("#homeRefresh > i").removeClass("icon-spin");
        return;
      }
      else {
        for (var j = 0; j < currentIdsLength; j++) {
          if (currentIds[j].id == EXTRA) {
            currentIds[j].data = app.processBuoyData(html);
            app.store.setFavorites(currentIds);
            if (!activeAJAX) {
              $("#homeRefresh").removeClass("icon-spin");
              this.renderFavorites();
              //app.homePage.render();
              //$("body").html(app.homePage.el);
              //app.homePage.resize();
              //app.homePage.registerEvents();
              break;
            }
            break;
          }
        }
      }
    }
  }

  this.initialize();
}

HomeView.template = Handlebars.compile($('#home-tpl').html());
HomeView.scrollerTemplate = Handlebars.compile($('#home-scroller-tpl').html());
HomeView.indicatorTemplate = Handlebars.compile($('#home-indicator-tpl').html());