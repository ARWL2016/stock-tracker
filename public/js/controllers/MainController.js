'use strict';

stockTrackerApp.controller('MainController',

  function MainController($scope, stockData) {
    $scope.symbol = '';
    $scope.activeSymbols = [];
    $scope.activePriceData = [];
    

    $scope.getStockData = (symbol) => {
      stockData.getTimeSeriesData(symbol)
        .then(res => {
          if (res) {
            $scope.symbol = '';
            // stockData.getCurrentData(); 
            $scope.activeSymbols = stockData.getActiveSymbols();
            $scope.activeData = stockData.getActiveData();
            $scope.activePriceData = stockData.getActivePriceData();
            console.log('MainCtrl:', $scope.activeSymbols);
            console.log('MainCtrl:', $scope.activeData);
            console.log('MainCtrol: ', $scope.activePriceData );
          }
        })
    };

    $scope.removeSymbol = (sym) => {
        console.log('this', sym);
        $scope.activeSymbols.forEach((symbol, i) => {
            if (symbol === sym) {
                $scope.activeSymbols.splice(i, 1);
                $scope.activeData.splice(i, 1);
            }
        })
    };

    // updateChart = () => {

    // }

      // CHART 

      $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
      $scope.series = ['AZN', 'BARC'];
      $scope.data = [
        [65, 59, 80, 81, 56, 55, 40],
        [28, 48, 40, 19, 86, 27, 90]
      ];
      $scope.onClick = function (points, evt) {
        console.log(points, evt);
      };
      $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
      $scope.options = {
        legend: {
          display: true, 
          position: 'right'
        },
        scales: {
          yAxes: [
            {
              id: 'y-axis-1',
              type: 'linear',
              display: true,
              position: 'left', 
              ticks: {
                beginAtZero: true
              }
            },
            {
              id: 'y-axis-2',
              type: 'linear',
              display: true,
              position: 'right'
            }
          ]
        }
      };

  }
)