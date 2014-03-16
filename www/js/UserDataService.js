angular.module("Main")

.factory("UserDataService", function($rootScope) {

    return {
        addFavorite: function(buoyId) {
            var currentFavsLength = 0,
                buoyIsAlreadyFav = false,
                i = 0;

            // if current favs already exist
            if ($rootScope.userData.favorites) {
                favoritesLength = $rootScope.userData.favorites.length;
                
                // iterates through current favs
                for (i = 0; i < favoritesLength; i++) {
                    //if buoy is already favorite
                    if ($rootScope.userData.favorites[i].id == buoyId) {
                        buoyIsAlreadyFav = true;
                        break;
                    }
                }
                if (!buoyIsAlreadyFav) {
                    $rootScope.userData.favorites.push({id: buoyId});
                }
            // no currentFavs exist    
            } else {
                $rootScope.userData.favorites = [{"id": buoyId}];
            }
        },
        removeFavorite: function(buoyId) {
            var currentFavsLength = $rootScope.userData.favorites.length,
                i = 0;
            
            if ($rootScope.userData.favorites) {
                for (i = 0; i < currentFavsLength; i++) {
                    if ($rootScope.userData.favorites[i].id == buoyId) {
                        $rootScope.userData.favorites.splice(i,1);
                        break;
                    }
                }
            }
        }
    }
});