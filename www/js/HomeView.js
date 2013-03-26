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
    this.renderFavorites();
    return this;
  }

  this.renderFavorites = function() {
    store.getFavorites(function(favorites) {
      $('#favBuoys').html(HomeView.favsTemplate(favorites));
    });
  }

  this.initialize();
}

HomeView.template = Handlebars.compile($("#home-tpl").html());
HomeView.favsTemplate = Handlebars.compile($("#favs-tpl").html());