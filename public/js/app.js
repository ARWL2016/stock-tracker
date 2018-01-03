
'use strict';

var app = angular.module('app', ['ngRoute', 'chart.js'])
    .config(function($routeProvider, $locationProvider) {
      // no routes as yet
        $routeProvider
          .when('/main', {
            templateUrl: 'templates/Main.html',
            controller: 'MainController'
          })
          .when('/about', {
            templateUrl: 'templates/About.html', 
            // controller: 'AboutController', 
            // controllerAs: 'about'
          })
          .otherwise({ redirectTo: '/main' });
        $locationProvider.html5Mode(true);
    })
  .run(function ($log) {
    $log.info('Stock Tracker App ready to go');
  });



