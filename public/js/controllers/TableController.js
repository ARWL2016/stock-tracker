'use strict';

stockTrackerApp.controller('TableController', 
  function TableController($scope, stockData) {

    $scope.currentData = stockData.getCurrentData();
    $scope.buttons = stockData.getCurrentSymbols();
    console.log('TableController:', $scope.buttons);
     

  }
)