var app = {
  
  registerEvents: function() {
    $(window).on("hashchange", $.proxy(this.route, this));
    window.addEventListener('load', function() {
      FastClick.attach(document.body);
    }, false);
    $(window).on("orientationchange", function(event) {
      event.preventDefault();
    });
  },

  route: function() {
    var self = this;
    this.previousHash = this.hash;
    this.hash = window.location.hash;

    if (this.hash.match("home")) {
      if (this.homePage) {
        this.homePage.render();
        $("body").html(this.homePage.el);
        this.homePage.resize();
        this.homePage.registerEvents();
      }
      else {
        this.homePage = new HomeView(this.store);
        this.homePage.render();
        $("body").html(this.homePage.el);
        this.homePage.resize();
        this.homePage.registerEvents();
      }
      return;
    }
    
    if (this.hash.match("map")) {
      if (this.mapPage) {
        $("body").html(this.mapPage.el);
        this.mapPage.registerEvents();
      } 
      else {
        this.mapPage = new MapView();
        this.mapPage.render();
        $("body").html(this.mapPage.el);
        this.mapPage.buoyMap();
      } 
      return;
    }

    if (this.hash.match("menu")) {
      if (this.menuPage) {
        $("body").html(this.menuPage.el);
        this.menuPage.registerEvents();
      } 
      else {
        this.menuPage = new MenuView();
        this.menuPage.render();
        $("body").html(this.menuPage.el);
        this.menuPage.registerEvents();
      } 
      return;
    }
    
    if (this.hash.match("search")) {
      if (this.searchPage) {
        $("body").html(this.searchPage.el);
        this.searchPage.registerEvents();
        this.searchPage.getClosestBuoys();
      } 
      else {
        this.searchPage = new SearchView(this.store);
        this.searchPage.render();
        $("body").html(this.searchPage.el);
        this.searchPage.registerEvents();
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
        message,  //message
        null,     //callback to invoke when button pressed
        title,    //title
        "OK"      //button label
      );
    } 
    else {
      alert(title ? (title + ": " + message) : message);
    }
  },

  showConfirm: function(message, onConfirm, title, buttonLabels) {
    if (navigator.notification) {
      navigator.notification.confirm(
        message,      //message
        onConfirm,    //callback to invoke with index of button pressed
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

  addFavBuoy: function(input,inputVal) {
    var currentFavorites = this.store.getFavorites();
    if (!currentFavorites.length) {
      if (isValidId(inputVal)) {
        addBuoy(inputVal);
        if (input) {
          input.val("");
        }
      }
      else {
        app.showAlert(inputVal + " does not exist","TITLE DNE");
        if (input) {
          input.val("");
        }
      }
    }
    else {
      //checks if buoy is already a favorite
      if (isFavorite(inputVal,currentFavorites)) {
        app.showAlert(inputVal + " is already a favorite","TITLE");
        if (input) {
          input.val("");
        }
      }
      else {
        //checks if buoy matches any buoy ids
        if (isValidId(inputVal)) {
          if (isValidId(inputVal)) {
            addBuoy(inputVal,currentFavorites);
            if (input) {
              input.val("");
            }
          }
        }
        else {
          app.showAlert(inputVal + " does not exist","TITLE DNE");
          if (input) {
            input.val("");
          }
        }
      }
    }

    function addBuoy(inputVal) {
      currentFavorites.push({id:inputVal,data:"<p>No Updates</p>"});
      app.store.setFavorites(currentFavorites);
      //app.homePage.renderFavorites(currentFavorites);
      if (app.menuPage) {
        app.menuPage.render();
      }
      app.showAlert("Buoy with ID: " + inputVal + " has been added.","Buoy Added");
    }

    function isValidId(inputVal) {
      for (var i = 0; i<buoys.length; i++) {
        if (buoys[i].id == inputVal) {
          return 1;
        }
      }
      return 0;
    }

    function isFavorite(inputVal) {
      for (var i = 0; i < currentFavorites.length; i++) {
        if (inputVal == currentFavorites[i].id) {
          return 1;
        }
      }
      return 0;
    }
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

