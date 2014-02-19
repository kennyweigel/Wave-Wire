angular.module("Main", ["ionic"])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

    .state("home", {
      url: "/home",
      templateUrl: "templates/home.html",
      controller: "HomeController"
    })

    .state("settings", {
        url: "/settings",
        templateUrl: "templates/settings.html",
        controller: "SettingsController"
    })

    .state("map", {
        url: "/map",
        templateUrl: "templates/map.html",
        controller: "MapController"
    })

    .state("buoy/:buoyId", {
        url: "/buoy/:buoyId",
        templateUrl: "templates/buoy.html",
        controller: "BuoyController"
    });

  $urlRouterProvider.otherwise("/home");

});