'use strict';

var stockTrackerApp = angular.module('stockTrackerApp', ['ngRoute', 'ngMaterial'])
  .run(function($log) {
    $log.info('Stock Tracker App ready to go');
  });
  // .config(function($routeProvider, $locationProvider) {
  //     $routeProvider.when('/stocks', 
  //       {
  //         templateUrl: 'templates/GetStocks.html', 
  //         controller: 'GetStocksController'
  //       });
  //     $routeProvider.otherwise({redirectTo: '/'})
  // });
