angular.module("Main", ["ionic"])//, "Main.BuoyService","Main.LocalStorageService","Main.BuoyDataService"])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    // setup an abstract state for the tabs directive
    .state("home", {
      url: "/home",
      templateUrl: "templates/home.html",
      controller: "HomeController"
    })

    // the pet tab has its own child nav-view and history
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

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise("/home");

});