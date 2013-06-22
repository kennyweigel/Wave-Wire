var app = {
  
  registerEvents: function() {
    $(window).on("hashchange", $.proxy(this.route, this));
    window.addEventListener('load', function() {
      FastClick.attach(document.body);
    }, false);
  },

  route: function() {
    console.log("app route");
    var self = this;

    this.previousHash = this.hash;
    this.hash = window.location.hash;

    if (this.hash.match("home")) {
      if (this.homePage) {
        console.log("hash change homeview");
        $("body").html(this.homePage.el);
        this.homePage.renderFavorites(this.store.getFavorites());
        this.homePage.registerEvents();
      }
      else {
        console.log("hash change new homeview");
        this.homePage = new HomeView(this.store).render();
        $("body").html(this.homePage.el);
        this.homePage.renderFavorites(this.store.getFavorites());
        this.homePage.homePageRefresh();
      }
      return;
    }
    
    if (this.hash.match("map")) {
      if (this.mapPage) {
        console.log("hash change mapView");
        $("body").html(this.mapPage.el);
        this.mapPage.registerEvents();
      } 
      else {
        console.log("hash change new mapview");
        this.mapPage = new MapView().render();
        $("body").html(this.mapPage.el);
        this.mapPage.buoyMap();
      } 
      return;
    }

    if (this.hash.match("menu")) {
      if (this.menuPage) {
        console.log("hash change menuView");
        $("body").html(this.menuPage.el);
        this.menuPage.registerEvents();
      } 
      else {
        console.log("hash change new menuview");
        this.menuPage = new MenuView().render();
        $("body").html(this.menuPage.el);
      } 
      return;
    }
    
    if (this.hash.match("search")) {
      if (this.searchPage) {
        console.log("hash change searchView");
        //$("body").html(this.searchPage.el);
        this.searchPage.render();
        this.searchPage.registerEvents();
        this.searchPage.getClosestBuoys();
      } 
      else {
        console.log("hash change new searchview");
        this.searchPage = new SearchView(this.store);
        //$("body").html(this.searchPage.el);
        this.searchPage.render();
        this.searchPage.getClosestBuoys();
      } 
      return;
    }
  },

  initialize: function() {
    var self = this;
    window.location.hash = "home";
    this.hash = "home";
    this.registerEvents();
    this.store = new LocalStorageStore();
    this.screenHeight = $(window).height();
    this.screenWidth = $(window).width();
    this.route();
  },

  showAlert: function (message, title) {
    if (navigator.notification) {
      navigator.notification.alert(
        message,  //
        null,     //
        title,    //
        "OK"      //
      );
    } 
    else {
      alert(title ? (title + ": " + message) : message);
    }
  },

  showConfirm: function(message, onConfirm, title, buttonLabels) {
    if (navigator.notification) {
      navigator.notification.confirm(
        message,      // message
        onConfirm,    // callback to invoke with index of button pressed
        title,        //title
        buttonLabels  //[buttonLabels]
      );
    }
    else {
      var clickedOk = confirm(message);
      if (clickedOk) {
        onConfirm(1);
      }
    }
  },

  addFavBuoy: function(input,inputVal,currentFavs) {
    currentFavs.push({id:inputVal,data:"<p>No Updates</p>"});
    app.store.setFavorites(currentFavs);
    app.homePage.renderFavorites(currentFavs);
    if (app.menuPage) {
      app.menuPage.render();
    }
    input.val("");
    this.showAlert(inputVal,"has been added to Favorites");
  },

  processBuoyData: function(html) {
    var condStart = html.indexOf("<h2>Weather Conditions</h2>");
    var indStart = html.indexOf("<p>",condStart);
    var indEnd = html.indexOf("</p>",indStart)+4;
    var parsedHTML = html.substring(indStart,indEnd);
    return parsedHTML;
  },

};

app.initialize();

// for testing on PC browsers ----------------------
//app.homePage.update(testHTML,'success','44007');

