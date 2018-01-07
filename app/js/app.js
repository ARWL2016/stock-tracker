(function(){

  var app = angular.module('app', ['ngRoute', 'chart.js']);

      app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
       
        $routeProvider
            .when('/main', {
              templateUrl: '/templates/Main.html',
              controller: 'MainController', 
              controllerAs: 'main'
            })
            .when('/companies', {
              templateUrl: '/templates/Companies.html', 
              controller: 'CompanyController', 
              controllerAs: 'comp'
            })
            .otherwise({ redirectTo: '/main' });
          $locationProvider.html5Mode(true);
      }]); 

      app.run([function () {
        console.log('Stock Tracker App ready.')
      }]);

}());


