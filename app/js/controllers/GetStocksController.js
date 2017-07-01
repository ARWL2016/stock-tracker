'use strict';

stockTrackerApp.controller('GetStocksController', 
  function GetStocksController($scope, stockData) {
    $scope.number = 0;
    $scope.output = 0;
    $scope.add = function(number) {
      
      $scope.output = stockData.addNumbers(+number, +number);
    }
    
    
  }
)