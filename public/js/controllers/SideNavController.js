'use strict';

stockTrackerApp.controller('SideNavController', 
  function SideNavController($scope, stockData) {
    $scope.symbol;
    $scope.data;
    $scope.getStockData = function(symbol) {
      
      stockData.getTimeSeriesData(symbol);
        // .then(function(res) {
        //   $scope.data = res.data.dataset.data[0][1];
        //   console.log(res.data);
        // })
        // .catch(function(error) {
        //   console.log(error);
        // })
    }
    
    
  }
)