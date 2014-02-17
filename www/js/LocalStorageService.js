angular.module("Main")

.factory("LocalStorageService", function() {


    return {
        get: function() {
            var currentFavs = JSON.parse(window.localStorage.getItem("favorites"));
            return currentFavs;
        },
        set: function(newFavs) {
            window.localStorage.setItem("favorites", JSON.stringify(newFavs));
            return;
        },
        add: function(buoyId) {
            var currentFavs = JSON.parse(window.localStorage.getItem("favorites"));
            var currentFavsLength = 0;
            var buoyIsAlreadyFav = false;
            var i = 0;
            //if current favs already exist
            if (currentFavs) {
                currentFavsLength = currentFavs.length;
                //iterates through current favs
                for (i = 0; i < currentFavsLength; i++) {
                    //if buoy is already favorite
                    if (currentFavs[i].id == buoyId) {
                        buoyIsAlreadyFav = true;
                        break;
                    }
                }
                if (!buoyIsAlreadyFav) {
                    currentFavs.push({id: buoyId});
                    window.localStorage.setItem("favorites", JSON.stringify(currentFavs));
                }
            //no currentFavs exist    
            } else {
                window.localStorage.setItem("favorites", JSON.stringify([{id: buoyId}]));
            }
        },
        remove: function(buoyId) {
            var currentFavs = JSON.parse(window.localStorage.getItem("favorites"));
            var currentFavsLength = currentFavs.length;
            var i = 0;
            if (currentFavs) {
                for (i = 0; i < currentFavsLength; i++) {
                    if (currentFavs[i].id == buoyId) {
                        currentFavs.splice(i,1);
                        window.localStorage.setItem("favorites", JSON.stringify(currentFavs));
                        break;
                    }
                }
            }
        } 
    }
});