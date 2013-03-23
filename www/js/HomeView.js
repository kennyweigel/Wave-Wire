var HomeView = function() {

  this.initialize = function() {
    this.el = $('<div/>');
    this.registerEvents();
  }

  this.registerEvents = function() {
    this.el.on('submit','#test',app.validateBuoy);
  }

  this.render = function() {
    this.el.html(HomeView.template());
    return this;
  }
    
  this.initialize();
}

HomeView.template = Handlebars.compile($("#home-tpl").html());