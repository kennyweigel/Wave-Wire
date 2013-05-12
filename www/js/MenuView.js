var MenuView = function(store) {

  this.initialize = function() {
    this.el = $("<div/>");
    this.registerEvents();
  }

  this.registerEvents = function() {
    this.el.on("swipe","li",this.favListSwipe);
    this.el.on("click",".deleteBtn",app.removeFavorite);

    //DEBUG
    this.el.on("dblclick","li",this.favListSwipe);
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
      $("#"+currentId+"-li>a").append("<button id='"+currentId+"-delete' class='deleteBtn btn btn-danger btn-mini pull-right'>Delete</button>");
    }
  }

  var _deleteBtnExists = function() {
    if ($(".deleteBtn").length) {
      return 1;
    }
    else {
      return 0;
    }
  }

  this.initialize();
}

MenuView.template = Handlebars.compile($("#menu-tpl").html());