var app = {
  
  registerEvents: function() {
    $(window).on('hashchange', $.proxy(this.route, this));
  },

  route: function() {
    console.log('app route');
    var self = this;
    var hash = window.location.hash;
    if (hash.match(this.homeURL)) {
      if (this.homePage) {
        console.log('hash change homeview');
        $('body').html(this.homePage.el);
        this.homePage.registerEvents();
      }
      else {
        console.log('hash change new homeview');
        console.log(this.store);
        this.homePage = new HomeView(this.store).render();
        $('body').html(this.homePage.el);
        this.homePage.renderFavorites();
      }
      return;
    }
    
    if (hash.match(this.mapURL)) {
      if (this.mapPage) {
        console.log('hash change mapView');
        $('body').html(this.mapPage.el);
        this.mapPage.registerEvents();
      } 
      else {
        console.log('hash change new mapview');
        this.mapPage = new MapView().render();
        $('body').html(this.mapPage.el);
      } 
      return;
    }
  },

  initialize: function() {
    var self = this;
    this.homeURL = '#home';
    this.mapURL = '#map';
    window.location.hash = this.homeURL;
    this.registerEvents();
    this.store = new LocalStorageStore();
    this.route();
  },

  showAlert: function (message, title) {
    if (navigator.notification) {
      navigator.notification.alert(message, null, title, 'OK');
    } 
    else {
      alert(title ? (title + ": " + message) : message);
    }
  },

  validateBuoy: function () {
    //form input value
    var input = $('#mainSearch');
    var inputVal = input.val().toUpperCase();
    
    //new
    console.log(app.store);
    var currentFavs = app.store.getFavorites();
    var inFavs = 0;
    for (var i = 0; i < currentFavs.length; i++) {
      if (inputVal == currentFavs[i].id) {
        inFavs = 1;
      }
    }

    //checks if buoy is already a favorite
    if (inFavs) {
      app.showAlert(inputVal + ' is already a favorite','TITLE');
      input.val('');
    }
    else {
      //checks if buoy matches any buoy ids
      var idExists = 0;
      for (var i = 0; i<buoys.length; i++) {
        if (buoys[i].id == inputVal) {
          app.addFavBuoy(input,inputVal,currentFavs);
          idExists = 1;
          break;
        }
      }
      if (!idExists) {
        app.showAlert(inputVal + ' does not exist','TITLE DNE');
        input.val('');
      }
    }
  },

  addFavBuoy: function(input,inputVal,currentFavs) {
    currentFavs.push({id:inputVal});
    console.log(currentFavs);
    this.store.setFavorites(currentFavs);
    this.homePage.renderFavorites();
    //sets input field back to blank
    input.val('');
  },

};

app.initialize();