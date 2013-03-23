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
        this.homePage = new HomeView().render();
        $('body').html(this.homePage.el);
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
    this.route();
    //this.store = new LocalStorageStore(function() {
    //    self.route();
    //});
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
    //checks if buoy is already a favorite
    if ($.inArray(inputVal, favorites) != -1) {
      app.showAlert(inputVal + ' is already a favorite','TITLE');
      input.val('');
    }
    else {
      //checks if buoy matches any buoy ids
      var idExists = 0;
      for (var i = 0; i<buoys.length; i++) {
        if (buoys[i].id == inputVal) {
          app.addFavBuoy(input,inputVal);
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

  addFavBuoy: function(input,inputVal) {
    //gets number of direct children aka num favBuoys
    var n = $('#favBuoys > div').size();
    console.log('size '+n);
    //appends a new accordion widget to list
    $("<div class='accordion-group'> \
      <div class='accordion-heading'> \
        <a class='accordion-toggle' data-toggle='collapse' data-parent='#favBuoys' href='#"+n+"'>" +
          inputVal +
        "</a> \
      </div> \
      <div id='"+n+"' class='accordion-body collapse'> \
        <div class='accordion-inner'> \
          Anim pariatur cliche... \
        </div> \
      </div> \
    </div>").appendTo('#favBuoys');
    //sets input field back to blank
    input.val('');
  },

};

app.initialize();