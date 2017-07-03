'use strict';

stockTrackerApp.controller('SearchController', 
  function SearchController($scope, stockData) {
    $scope.symbol;
    $scope.data;
    
    $scope.getStockData = function(symbol) {
      stockData.getTimeSeriesData(symbol)
        .then('I thenned again');
    }
  }
)