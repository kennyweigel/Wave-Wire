var MenuView = function(store) {

  this.initialize = function() {
    this.el = $("<div/>");
    this.registerEvents();
  }

  this.registerEvents = function() {
    this.el.on("swipe",".menuBuoy",this.favListSwipe);
    this.el.on("click",".deleteBtn",app.removeFavorite);
    this.el.on("click","#menuAddBuoy",this.hashChangeSearch);

    //DEBUG
    this.el.on("dblclick",".menuBuoy",this.favListSwipe);
  }

  this.render = function() {
    this.el.html(MenuView.template(store.getFavorites()));
    return this;
  }

  this.favListSwipe = function() {
    var currentId = $(this).attr('id').substring(0,5);
    if (_deleteBtnExists()) {
      $(".deleteBtn").remove();
    }
    else {
      $("#"+currentId+"-li").append("<button id='"+currentId+"-delete' class='deleteBtn btn btn-danger pull-right'>Delete</button>");
    }
  }

  this.resizeElements = function() {
    $("#buoyTable").width(app.screenWidth - 20);
  }

  var _deleteBtnExists = function() {
    if ($(".deleteBtn").length) {
      return 1;
    }
    else {
      return 0;
    }
  }

  this.hashChangeSearch = function() {
    window.location.hash = "search";
  }

  this.initialize();
}

MenuView.template = Handlebars.compile($("#menu-tpl").html());