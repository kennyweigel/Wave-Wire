var LocalStorageStore = function(successCallback, errorCallback) {

  this.getFavorites = function(callback) {
    var getFavs = JSON.parse(window.localStorage.getItem("favorites"));
    callLater(callback, getFavs);
  }

  // Used to simulate async calls. This is done to provide a consistent interface with stores (like WebSqlStore)
  // that use async data access APIs
  var callLater = function(callback, data) {
    if (callback) {
      setTimeout(function() {
        callback(data);
      });
    }
  }

  callLater(successCallback);
}

  //window.localStorage.setItem("favorites", JSON.stringify(favorites));







