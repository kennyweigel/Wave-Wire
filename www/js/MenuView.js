var MenuView = function(store) {

  this.initialize = function() {
    this.el = $("<div/>");
    this.registerEvents();
  }

  this.registerEvents = function() {
    console.log("register menu events");
    this.el.on("click",".deleteBtn",this.removeFavorite);
    this.el.on("click","#menuAddBuoy",this.hashChangeSearch);
  }

  this.render = function() {
    this.el.html(MenuView.template(store.getFavorites()));
    return this;
  }

  this.removeFavorite = function() {
    var currentId = $(this).parent().attr('id').substring(0,5);
    var currentFavs = app.store.getFavorites();
    for (var i = 0; i < currentFavs.length; i++) {
      if (currentId == currentFavs[i].id) {
        currentFavs.splice(i,1);
        break;
      }
    }
    app.store.setFavorites(currentFavs);
    app.homePage.renderFavorites(currentFavs);
    app.menuPage.render();
  }

  this.resizeElements = function() {
    $("#buoyTable").width(app.screenWidth - 20);
  }

  this.hashChangeSearch = function() {
    window.location.hash = "search";
  }

  this.initialize();
}

MenuView.template = Handlebars.compile($("#menu-tpl").html());