angular.module("Main.BuoyDataService", [])

.factory("BuoyDataService", function($http) {
    var getBuoyUrl = function(buoyId) {
        return "http://www.ndbc.noaa.gov/data/5day2/" + buoyId + "_5day.txt";
    };
    var getBuoyData = function(buoyId) {
        console.log("getBuoyData " + getBuoyUrl(buoyId)); //$http({method: "GET", url: getBuoyUrl(buoyId)})
        $http({method: "GET", url: 'http://localhost:4444/testData.txt'})
        .success(function(data, status, headers, config) {
            var removeNull= function(data) {
                var index = data.indexOf("");
                if (index > -1) {

                    data.splice(index, 1);
                    removeNull(data);
                }
                return data;
            };
            data = data.split('\n');
            data = data[2];
            data = data.split(" ");
            data = removeNull(data);
            return {
                "year": data[0],
                "month": data[1],
                "day": data[2],
                "hour": data[3],
                "minute": data[4],
                "wind-direction": data[5],
                "wind-speed": data[6],
                "wind-gust": data[7],
                "wave-height": data[8],
                "wave-dominant-period": data[9],
                "wave-average-period": data[10],
                "median-wave-direction": data[11],
                "pressure": data[12],
                "air-temp": data[13],
                "water-temp": data[14],
                "dew-point": data[15],
                "visibilty": data[16],
                "ptdy?": data[17],
                "tide": data[18]
            }            
        })
        .error(function(data, status, headers, config) {
            alert("error");
        });
    }

    return {
        all: function() {

        },

        get: function(buoyId) {
            getBuoyData(buoyId);
        }
    };
    
});
