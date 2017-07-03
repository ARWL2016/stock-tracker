'use strict';

stockTrackerApp.controller('MainController', 
  function MainController($scope, stockData) {
    $scope.symbol;
    $scope.data;
    
    $scope.getStockData = (symbol) => {
      stockData.getTimeSeriesData(symbol)
        .then(data => {
          console.log('THEN', data);
        })
    }
  }
)