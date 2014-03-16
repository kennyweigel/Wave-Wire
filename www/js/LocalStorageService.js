angular.module("Main")

.factory("LocalStorageService", function() {

    return {
        get: function(key) {
            var currentFavs = JSON.parse(window.localStorage.getItem(key));
            return currentFavs;
        },
        set: function(key, newValue) {
            window.localStorage.setItem(key, JSON.stringify(newValue));
            return;
        }
    }
});