angular.module("Main")

.factory("BuoyDataService", function($http) {

    return {
        all: function() {

        },
        get: function(buoyId) {
            //local testing
            //return $http({method: "GET", url: "http://localhost:8000/testData.txt"});
            //on device
            return $http({method: "GET", url: "http://www.ndbc.noaa.gov/data/5day2/" + buoyId + "_5day.txt"});
        }
    };
    
});
