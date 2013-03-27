var HomeView = function(store) {

  this.initialize = function() {
    this.el = $('<div/>');
    this.registerEvents();
  }

  this.registerEvents = function() {
    this.el.on('submit','#test',app.validateBuoy);
  }

  this.render = function() {
    console.log('render');
    var testt = JSON.parse(window.localStorage.getItem('favorites'));
    this.el.html(HomeView.template(testt));
    //this.renderFavorites();
    return this;
  }

  this.renderFavorites = function() {
    //var testt = store.getFavorites();
    $('body div #favBuoys').html('<p>Test</p>');
    console.log($('#favBuoys').html());
    console.log('render favs');
    var testt = JSON.parse(window.localStorage.getItem('favorites'));
    console.log(testt);
    var testtt = HomeView.favsTemplate(testt);
    console.log(testtt);
    //$('#favBuoys').html(HomeViewfavsTemplate(testt));
    //store.getFavorites(function(favorites) {
    //  $('#favBuoys').html(HomeView.favsTemplate(favorites));
    //});
  }

  this.initialize();
}

HomeView.template = Handlebars.compile($("#home-tpl").html());
//HomeView.favsTemplate = Handlebars.compile($("#favs-tpl").html());