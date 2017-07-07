'use strict';

var stockTrackerApp = angular.module('stockTrackerApp', ['ngRoute', 'chart.js'])
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



