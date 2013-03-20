var HomeView = function() {

  this.render = function() {
      this.el.html(HomeView.template());
    return this;
  };

  this.initialize = function() {
    // Define a div wrapper for the view. The div wrapper is used to attach events.
    this.el = $('<div/>');
    //
    this.registerEvents();
  };
  
  this.registerEvents = function() {
    //THIS LINE BREAKS EVERYTHING---------------------------------------------------
    //this.el.on('submit','#test',this.addFormBuoy($('#mainSearch'));
  };


  this.addFormBuoy = function($buoy) {
    $("<div data-role='collapsible'><h3>"+$buoy.val()+"</h3><p>test test</p></div>").appendTo('#accordion2');
    $buoy.val('');
  };
  
  this.initialize();
}

HomeView.template = Handlebars.compile($("#home-tpl").html());
