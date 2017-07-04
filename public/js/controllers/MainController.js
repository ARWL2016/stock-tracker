'use strict';

stockTrackerApp.controller('MainController', 
  function MainController($scope, stockData) {
    $scope.activeSymbols = [];
    $scope.activeData = [];
    
    $scope.getStockData = (symbol) => {
      stockData.getTimeSeriesData(symbol)
        .then(res => {
          if (res) {
            // stockData.getCurrentData(); 
            $scope.activeSymbols = stockData.getActiveSymbols();
            $scope.activeData = stockData.getActiveData(); 
            console.log('MainCtrl:', $scope.activeSymbols);
            console.log('MainCtrl:', $scope.activeData);
          }
        })
    }
  }
)