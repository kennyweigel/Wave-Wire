var HomeView = function(store) {

  this.initialize = function() {
    this.el = $('<div/>');
    this.registerEvents();
  }

  this.registerEvents = function() {
    this.el.on('submit','#test',app.validateBuoy);
  }

  this.render = function() {
    this.el.html(HomeView.template());
    this.getFavs();
    return this;
  }

  this.getFavs = function() {
    store.getFavs(function(favorites) {
      $('#favBuoys').html(HomeView.favsTemplate(favorites));
    });
  }

  this.initialize();
}

HomeView.template = Handlebars.compile($("#home-tpl").html());
HomeView.favsTemplate = Handlebars.compile($("#favs-tpl").html());