var MenuView = function() {

  this.initialize = function() {
    this.el = $("<div/>");
    this.registerEvents();
  }

  this.registerEvents = function() {
    this.el.on("click",".deleteBtn",this.confirmRemove);
    this.el.on("click","#menuAddBuoy",this.hashChangeSearch);
  }

  this.render = function() {
    this.el.html(MenuView.template(app.store.getFavorites()));
    return this;
  }

  this.confirmRemove = function() {
    app.menuPage.currentId = $(this).parent().attr("id").substring(0,5);
    app.showConfirm(
      "Are you sure you want to remove buoy: " + app.menuPage.currentId + "?",
      app.menuPage.removeFavorite,
      "Remove Buoy",
      ["Yes", "Cancel"]
    );
  }

  this.removeFavorite = function(buttonIndex) {
    if (buttonIndex == 1) {
      var currentFavs = app.store.getFavorites();
      for (var i = 0; i < currentFavs.length; i++) {
        if (app.menuPage.currentId == currentFavs[i].id) {
          currentFavs.splice(i,1);
          break;
        }
      }
      app.store.setFavorites(currentFavs);
      app.homePage.renderFavorites(currentFavs);
      app.menuPage.render();
    }
  }

  this.hashChangeSearch = function() {
    window.location.hash = "search";
  }

  this.initialize();
}

MenuView.template = Handlebars.compile($("#menu-tpl").html());