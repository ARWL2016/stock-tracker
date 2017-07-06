'use strict';

stockTrackerApp.controller('MainController',

  function MainController($scope, stockDataService, chartConfigService) {
    $scope.symbol = '';
    $scope.activeSymbols = [];
    $scope.activePriceData = [];

    $scope.labels = [];
    $scope.series = [];
    $scope.data = [ ];
    $scope.onClick = function (points, evt) {
      console.log(points, evt);
    };
    $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }];
    $scope.options = chartConfigService.returnOptions();
    

    $scope.getStockData = (symbol) => {
      stockDataService.getTimeSeriesData(symbol)
        .then(res => {
          if (res) {
            $scope.symbol = '';
           
            $scope.activeSymbols = stockDataService.getActiveSymbols();
            $scope.activeData = stockDataService.getActiveData();
            $scope.activePriceData = stockDataService.getActivePriceData();
            console.log('MainCtrl:', $scope.activeSymbols);
            console.log('MainCtrl:', $scope.activeData);
            console.log('MainCtrol: ', $scope.activePriceData);
            $scope.renderChart(); 
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

    $scope.renderChart = () => {
      var labelsArray = [];
      var dataArray = [];
      var seriesLength = 1500;
      var seriesCount = $scope.activePriceData.length;
      console.log(seriesCount);
      // add data for new series

      $scope.activePriceData[seriesCount-1].forEach((dataPoint, index) => {
        if (index < seriesLength) {
          dataArray.unshift(dataPoint[1]);
          labelsArray.unshift(dataPoint[0]);
        }
      }); 
      $scope.data.push(dataArray);
      $scope.labels = labelsArray;
      $scope.series.push($scope.activeSymbols[seriesCount-1]);
       
      console.log($scope.data);
      console.log($scope.labels);
      console.log($scope.series);
    }

    
      // CHART 

 

  }
)