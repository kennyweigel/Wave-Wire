angular.module("Main")

.factory("ProcessDataService", function($rootScope) {

    var getDate = function(data) {
            return parseInt(data.month, 10) + "/" + data.day + "/" + data.year;
        },
        getTime = function(data) {
            return parseInt(data.hour, 10) + ":" + data.minute;
        },
        getSpeed = function(input) {
            if ($rootScope.userData.units == "us") {
                return {
                    "value": roundTenth(input * 2.23694),
                    "units": "mph"
                };
            } else if ($rootScope.userData.units == "metric") {
                return {
                    "value": roundTenth(input * 3.6),
                    "units": "kph"
                };
            }
        },
        getDirection = function(input) {
            //TODO ADD LOGIC HERE
            return {
                "value": input,
                "units": "degrees"
            };
        },
        getHeight = function(input) {
            if ($rootScope.userData.units == "us") {
                return {
                    "value": roundTenth(input * 3.28084),
                    "units": "ft"
                };
            } else if ($rootScope.userData.units == "metric") {
                return {
                    "value": roundTenth(input),
                    "units": "m"
                };
            }
        },
        getTemp = function(input) {
            if ($rootScope.userData.units == "us") {
                return {
                    "value": roundTenth(input * 1.8 + 32),
                    "units": "F"
                };
            } else if ($rootScope.userData.units == "metric") {
                return {
                    "value": roundTenth(input),
                    "units": "C"
                };
            }
        },
        roundTenth = function(input) {
            return Math.round(input * 10) / 10;
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
        processRow = function(row) {
            var processedRow = {},
                key = null;

            processedRow["date"] = {
                "value": getDate(row),
                "units": "NA"
            };
            processedRow["time"] = {
                "value": getTime(row),
                "units": "NA"
            };

            for (key in row) {
                if (row[key] != "MM") {
                    switch (key) {
                        case "windDirection":
                            processedRow["windDirection"] = getDirection(row[key]);
                            processedRow["windDirection"].field = "Wind Direction";
                            break;
                        case "windSpeed":
                            processedRow["windSpeed"] = getSpeed(row[key]);
                            processedRow["windSpeed"].field = "Wind Speed";
                            break;
                        case "windGust":
                            processedRow["windGust"] = getSpeed(row[key]);
                            processedRow["windGust"].field = "Wind Gust";
                            break;
                        case "waveHeight":
                            processedRow["waveHeight"] = getHeight(row[key]);
                            processedRow["waveHeight"].field = "Wave Height";
                            break;
                        case "waveDominantPeriod":
                            processedRow["waveDominantPeriod"] = {
                                "value": row[key],
                                "units": "s",
                                "field": "Wave Dominant Period"
                            };
                            break;
                        case "waveAveragePeriod":
                            processedRow["waveAveragePeriod"] = {
                                "value": row[key],
                                "units": "s",
                                "field": "Wave Average Period"
                            };
                            break;
                        case "medianWaveDirection":
                            processedRow["medianWaveDirection"] = getDirection(row[key]);
                            processedRow["medianWaveDirection"].field = "Wave Direction";
                            break;
                        case "pressure":
                            processedRow["pressure"] = {
                                "value": row[key],
                                "units": "hPa",
                                "field": "Pressure"
                            };
                            break;
                        case "airTemp":
                            processedRow["airTemp"] = getTemp(row[key]);
                            processedRow["airTemp"].field = "Air Temp";
                            break;
                        case "waterTemp":
                            processedRow["waterTemp"] = getTemp(row[key]);
                            processedRow["waterTemp"].field = "Water Temp";
                            break;
                        case "dewPoint":
                            processedRow["dewPoint"] = getTemp(row[key]);
                            processedRow["dewPoint"].field = "Dew Point";
                            break;
                        case "visibilty":
                            processedRow["visibilty"] = {
                                "value": row[key],
                                "units": "nmi",
                                "field": "Visibility"
                            };
                            break;
                        case "ptdy":
                            processedRow["ptdy"] = {
                                "value": row[key],
                                "units": "hPa",
                                "field": "PTDY"
                            };
                            break;
                        case "tide":
                            processedRow["tide"] = {
                                "value": row[key],
                                "units": "ft",
                                "field": "Tide"
                            };
                            break;
                        default:
                            break;
                    }
                } else {
                    processedRow[key] = {
                        "value": "NA",
                        "units": ""
                    };
                }
            }

            return processedRow;
        },
        processIndividual = function(data) {
            var dataArray = [],
                processedRow = {},
                keys = [],
                i = 0;
                keysLength = 0;

            //gets the 3rd row only, the latest data
            data = data.split('\n');
            data = data[2];
            data = getDataRowArray(data);

            processedRow = processRow(data);
            console.log(processedRow);

            //need to arrange data in correct order
            dataArray.push(processedRow.time.value + " " + processedRow.date.value);
            
            keys = [
                "windDirection",
                "windSpeed",
                "windGust",
                "waveHeight",
                "waveDominantPeriod",
                "waveAveragePeriod",
                "medianWaveDirection",
                "pressure",
                "airTemp",
                "waterTemp",
                "dewPoint",
                "visibilty",
                "ptdy",
                "tide"
            ];
            keysLength = keys.length;

            for (i = 0; i < keysLength; i++) {
                if (processedRow[keys[i]]["value"] != "NA") {
                    dataArray.push(processedRow[keys[i]]);
                }
            }
            return dataArray;
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
