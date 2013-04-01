var LocalStorageStore = function() {

  this.getFavorites = function() {
    var favss = JSON.parse(window.localStorage.getItem('favorites'));
    return favss;
  }

  this.setFavorites = function(favss) {
    window.localStorage.setItem('favorites', JSON.stringify(favss));
  }

  if (!this.getFavorites()) {
  	this.setFavorites([]);
  }

}