'use strict';

var stockTrackerApp = angular.module('stockTrackerApp', ['ngRoute', 'ngMaterial'])
  .run(function($log) {
    $log.info('Stock Tracker App ready to go');
  })
  .config(function($routeProvider, $locationProvider) {
      $routeProvider.when('/chart', 
        {
          templateUrl: 'templates/Chart.html', 
          controller: 'ChartController'
        });
      $routeProvider.when('/table', 
      {
        templateUrl: 'templates/Table.html', 
        controller: 'TableController'
      });
      $routeProvider.otherwise({redirectTo: '/'});
      $locationProvider.html5Mode(true);
  });
