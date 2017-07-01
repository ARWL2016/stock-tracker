'use strict';

var stockTrackerApp = angular.module('stockTrackerApp', ['ngRoute'])
    .config(function($routeProvider, $locationProvider) {
        $routeProvider.when('/stocks', 
          {
            templateUrl: 'js/templates/GetStocks.html', 
            controller: 'GetStocksController'
          });
        $routeProvider.otherwise({redirectTo: '/'})
    });
