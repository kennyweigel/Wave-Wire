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
        this.page = this.homePage.el;
        this.slider.slidePage($(this.page));
        this.homePage.resize();
        this.homePage.registerEvents();
        console.log('refresh home');
      }
      else {
        this.homePage = new HomeView();
        this.homePage.render();
        $("#container").html(this.homePage.el);
        //this.page = this.homePage.el;
        this.homePage.resize();
        //this.slider.slidePage($(this.page));
        this.homePage.registerEvents();
        console.log('new home');
      }
    }
    
    if (this.hash.match("map")) {
      if (this.mapPage) {
        this.page = this.mapPage.el;
        this.slider.slidePage($(this.page));
        this.mapPage.registerEvents();
      } 
      else {
        this.mapPage = new MapView();
        this.mapPage.render();
        this.page = this.mapPage.el;
        this.slider.slidePage($(this.page));
        this.mapPage.buoyMap();
      } 
    }

    if (this.hash.match("menu")) {
      if (this.menuPage) {
        console.log('refresh menu');
        this.page = this.menuPage.el;
        this.slider.slidePage($(this.page));
        this.menuPage.registerEvents();
      } 
      else {
        this.menuPage = new MenuView();
        this.menuPage.render();
        this.page = this.menuPage.el;
        this.slider.slidePage($(this.page));
        this.menuPage.registerEvents();
      } 
    }
    
    if (this.hash.match("search")) {
      if (this.searchPage) {
        this.page = this.searchPage.el;
        this.slider.slidePage($(this.page));

        this.searchPage.registerEvents();
        this.searchPage.getClosestBuoys();
        console.log('refresh search');
      } 
      else {
        this.searchPage = new SearchView();
        this.searchPage.render();
        this.page = this.searchPage.el;
        this.slider.slidePage($(this.page));
        this.searchPage.registerEvents();
        this.searchPage.getClosestBuoys();
        console.log('new search');
      } 
    }
  },

  hashChangeHome: function() {
    window.location.hash = "home";
  },

  hashChangeMenu: function() {
    window.location.hash = "menu";
  },

  hashChangeMap: function() {
    window.location.hash = "map";
  },

  hashChangeSearch: function() {
    if (app.store.getFavorites().length < 10) {
      window.location.hash = "search";
    }
    else {
      app.showAlert("Only 10 buoys may be added to your Favorites","Favorites Limit Reached");
    }
  },

  hashChangeBack: function() {
    window.location.hash = app.previousHash;
  },

  initialize: function() {
    var self = this;
    this.slider = new PageSlider($("#container"));
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

  validateBuoy: function () {
    var inputVal = $("#searchInput").val().toUpperCase();
    if (app.store.getFavorites().length < 10) {
      app.showConfirm(
        "Are you sure you want to add buoy " + inputVal + "?",
        app.formBuoy,
        "Favorites",
        ["Yes", "Cancel"]
      );
    }
  },

  formBuoy: function() {
    var input = $("#searchInput");
    var inputVal = input.val().toUpperCase();
    app.addFavBuoy(input,inputVal);
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
        app.showAlert("Buoy " + inputVal + " can't be found.","Search");
        if (input) {
          input.val("");
        }
      }
    }
    else {
      //checks if buoy is already a favorite
      if (isFavorite(inputVal,currentFavorites)) {
        app.showAlert("Buoy " + inputVal + " is already a favorite.","Favorites");
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
          app.showAlert("Buoy " + inputVal + " can't be found.","Search");
          if (input) {
            input.val("");
          }
        }
      }
    }

    function addBuoy(inputVal) {
      currentFavorites.push({id:inputVal,data:"<p>No Updates</p>"});
      app.store.setFavorites(currentFavorites);
      if (app.menuPage) {
        app.homePage.render();
        app.menuPage.render();
      }
      return;
    }

    function isValidId(inputVal) {
      var regionsLength = regions.length;
      for (var i = 0; i < regionsLength; i++) {
        var specificRegion = window[regions[i].id];
        var specificRegionLength = specificRegion.length;
        for (var j = 0; j < specificRegionLength; j++) {
          if (specificRegion[j].id == inputVal) {
            return 1;
          }
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