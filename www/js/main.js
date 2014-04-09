angular.module('Main', ['ionic'])

.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider

        .state('home', {
            url: '/home',
            templateUrl: 'templates/home.html',
            controller: 'HomeController'
        })

        .state('settings', {
            url: '/settings',
            templateUrl: 'templates/settings.html',
            controller: 'SettingsController'
        })

        .state('map', {
            url: '/map',
            templateUrl: 'templates/map.html',
            controller: 'MapController'
        })

        .state('buoy/:buoyId', {
            url: '/buoy/:buoyId',
            templateUrl: 'templates/buoy.html',
            controller: 'BuoyController'
        });

    $urlRouterProvider.otherwise('/home');

})

.run(function($rootScope, LocalStorageService) {
    
    // watches userData for changes and updates localStorage
    // with current value
    $rootScope.$watch('userData', function(newValue) {
        LocalStorageService.set('userData', newValue);
    }, true);

    if (LocalStorageService.get('userData')) {
        $rootScope.userData = LocalStorageService.get('userData');
    } else {
        $rootScope.userData = {
            'position': null,
            'favorites': null,
            'units': 'us'
        };
        LocalStorageService.set('userData', $rootScope.userData);
    } 
});