angular.module("Main")

.factory("ProcessDataService", function($rootScope) {

    var getDate = function(data) {
            var date = null,
                time = null;

            date = parseInt(data.month, 10) + "/" + data.day + "/" + data.year;
            time = parseInt(data.hour, 10) + ":" + data.minute;

            return {
                "date": date,
                "time": time
            };
        },
        getSpeed = function(input) {
            if ($rootScope.userData.units == "us") {
                return input * 2.23694;
            } else if ($rootScope.userData.units == "metric") {
                return input * 3.6;
            }
        },
        getHeight = function(input) {
            if ($rootScope.userData.units == "us") {
                return input * 3.28084;
            } else if ($rootScope.userData.units == "metric") {
                return input;
            }
        },
        getTemp = function(input) {
            if ($rootScope.userData.units == "us") {
                return input * 1.8 + 32;
            } else if ($rootScope.userData.units == "metric") {
                return input;
            }
        },
        getDataRowArray = function(data) {
            var removeNull = function(data) {
                var index = data.indexOf("");
                if (index > -1) {
                    data.splice(index, 1);
                    removeNull(data);
                }
            };

            data = data.split(" ");
            removeNull(data);

            data = {
                "year": data[0],
                "month": data[1],
                "day": data[2],
                "hour": data[3],
                "minute": data[4],
                "windDirection": data[5],
                "windSpeed": data[6],
                "windGust": data[7],
                "waveHeight": data[8],
                "waveDominantPeriod": data[9],
                "waveAveragePeriod": data[10],
                "medianWaveDirection": data[11],
                "pressure": data[12],
                "airTemp": data[13],
                "waterTemp": data[14],
                "dewPoint": data[15],
                "visibilty": data[16],
                "ptdy": data[17],
                "tide": data[18]
            };

            return data;
        },
        processIndividual = function(data) {
            var dateTime = null,
                date = null,
                time = null;
                processedData = null,
                key = null;

            //gets the 3rd row only, the latest data
            data = data.split('\n');
            data = data[2];
            data = getDataRowArray(data);

            dateTime = getDate(data);
            time = dateTime.time;
            date = dateTime.date;

            for (key in data) {
                if (data[key] == "MM")
            }
            return [
                "date " +  date,
                "time " + time,
                "windDirection " + data.windDirection,
                "windSpeed " + data.windSpeed,
                "windGust " + data.windGust,
                "waveHeight " + data.waveHeight,
                "waveDominantPeriod " + data.waveDominantPeriod,
                "waveAveragePeriod " + data.waveAveragePeriod,
                "medianWaveDirection " + data.medianWaveDirection,
                "pressure " + data.pressure,
                "airTemp " + data.airTemp,
                "waterTemp " + data.waterTemp,
                "dewPoint " + data.dewPoint,
                "visibilty " + data.visibilty,
                "ptdy " + data.ptdy,
                "tide " + data.tide
            ];

        },
        processFavorites = function(data) {

        };


    return {
        individual: function(data) {
            //var testData = [];

            testData = processIndividual(data);

            //testData = getDataRowArray(data);

            //for (variable in data) {
                // if data field is empty it returns "MM"
            //    if (data[variable] != "MM") {
            //        testData.push(variable + ": " + data[variable]);
            //    }
            //}

            return testData;
        }
    };
});
