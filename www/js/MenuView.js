var MenuView = function(store) {

  this.initialize = function() {
    this.el = $('<div/>');
    this.registerEvents();
  }

  this.registerEvents = function() {
    this.el.on('swipe','li',app.removeFavorite);
    //this is added for testing on non touch device
    this.el.on('dblclick','li',app.removeFavorite);
  }

  this.render = function() {
    this.el.html(MenuView.template(store.getFavorites()));
    return this;
  }

  this.initialize();
}

MenuView.template = Handlebars.compile($('#menu-tpl').html());