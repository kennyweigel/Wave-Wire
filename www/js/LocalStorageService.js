angular.module("Main.LocalStorageService", [])

.factory("LocalStorageService", function() {


  return {
    get: function() {
      return allBuoys;
    },
    set: function() {
    	return allBuoys;
    }
  }
});