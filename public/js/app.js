'use strict';

var stockTrackerApp = angular.module('stockTrackerApp', ['ngRoute', 'ngMaterial', 'chart.js', 'underscore'])
    .run(function($log) {
        $log.info('Stock Tracker App ready to go');
    })
    .config(function($routeProvider, $locationProvider) {
        $routeProvider.when('/main', {
            templateUrl: 'templates/Main.html',
            controller: 'MainController'
        });
        $routeProvider.otherwise({ redirectTo: '/main' });
        $locationProvider.html5Mode(true);
    });

var underscore = angular.module('underscore', []);
underscore.factory('_', ['$window', function($window) {
  return $window._; 
}]);

