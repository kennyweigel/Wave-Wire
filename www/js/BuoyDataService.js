angular.module("Main.BuoyDataService", [])

.factory("BuoyDataService", function($http) {

    return {
        all: function() {

        },

        get: function(buoyId) {
            //"http://www.ndbc.noaa.gov/data/5day2/" + buoyId + "_5day.txt";
            return $http({method: "GET", url: 'http://localhost:8000/testData.txt'});
        }
    };
    
});
