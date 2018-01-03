(function(){

  var app = angular.module('app', ['ngRoute', 'chart.js']);

      app.config(['$logProvider', '$routeProvider', '$locationProvider', function($logProvider, $routeProvider, $locationProvider) {
        $logProvider.debugEnabled(true);
        
        $routeProvider
            .when('/main', {
              templateUrl: '/templates/Main.html',
              controller: 'MainController', 
              controllerAs: 'main'
            })
            .when('/about', {
              templateUrl: '/templates/About.html', 
              controller: 'AboutController', 
              controllerAs: 'about'
            })
            .otherwise({ redirectTo: '/main' });
          $locationProvider.html5Mode(true);
      }]); 

      app.run(function ($log) {
        $log.debug('Stock Tracker App ready to go');
      });

}())


