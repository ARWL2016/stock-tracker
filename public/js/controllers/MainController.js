'use strict';

stockTrackerApp.controller('MainController',

  function MainController($scope, stockDataService, chartConfigService, _) {
    $scope.symbol = '';

    // active data repository
    $scope.packets = [];

    // chart data 
    $scope.labels = []; // x-axis dates 
    $scope.series = []; // stores a title for each data series 
    $scope.data = [ ]; // stores an array for each data series
    $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }];
    $scope.options = chartConfigService.returnOptions();
    
    $scope.getStockData = (symbol) => {
      stockDataService.getTimeSeriesData(symbol)
        .then(newPacket => {
          if (newPacket) {
            console.log('newPacket: ', newPacket);
            $scope.symbol = '';

            // remove duplicate packets 
            $scope.packets = $scope.packets.filter(packet => packet.symbol !== newPacket.symbol);
            $scope.packets.push(newPacket);

            $scope.renderPacketToChart(newPacket); 
          }
        })
    };

    $scope.renderPacketToChart = (newPacket) => {
      const labelsArray = [];
      const dataArray = [];
      let seriesLength = 100;

      newPacket.price_data.forEach((price, index) => {
        if (index < seriesLength) {
          dataArray.unshift(price[1]);
          labelsArray.unshift(price[0]);
        }
      }); 
      $scope.data.push(dataArray);
      $scope.labels = labelsArray;
      $scope.series.push(newPacket.symbol);    
    }

    $scope.removeSymbol = (symbol) => {
      $scope.packets.forEach((packet, index) => {
        if (packet.symbol === symbol) {
          [$scope.packets, $scope.labels, $scope.series, $scope.data].forEach(array => array.splice(index, 1));
        }
      });
    };

  }
)