'use strict';

stockTrackerApp.controller('MainController',

  function MainController($scope, stockDataService, chartConfigService, _) {
    $scope.symbol = '';

    // active data repository
    $scope.packets = [];

    // chart data 
    $scope.dates = []; // x-axis 
    $scope.company_symbols = []; // stores a title for each data series 
    $scope.data = [ ]; // stores an array for each data series
    $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }];
    $scope.options = chartConfigService.options;
    $scope.timescale = chartConfigService.timescale;
    
    $scope.getStockData = (symbol) => {
      stockDataService.getTimeSeriesData(symbol)
        .then(newPacket => {
          if (newPacket) {
            console.log('newPacket: ', newPacket);
            $scope.symbol = '';

            // remove duplicate packets 
            $scope.packets = $scope.packets.filter(packet => packet.symbol !== newPacket.symbol);
            $scope.packets.push(newPacket);

            $scope.renderChart(); 
          }
        })
    };

    $scope.renderChart = () => {
      $scope.company_symbols = [];
      $scope.data = [];
      $scope.dates = [];

      let datesArray = [];
      let dataArray = [];
      let divisor = 4
      let seriesLength = 260;

      $scope.packets.forEach((packet, packetIndex) => {
        packet.price_data.forEach((price, priceIndex) => {
          if (priceIndex < seriesLength && (priceIndex % divisor === 0)) {
            dataArray.unshift(price[1]);
            if (packetIndex === 0) {
              datesArray.unshift(price[0]);
            }
          }
        }); 
        $scope.data.push(dataArray); 
        dataArray = []; 
        $scope.dates = datesArray; 

      $scope.company_symbols.push(packet.symbol);  
      }); 
       
    }

    $scope.removeSymbol = (symbol) => {
      $scope.packets.forEach((packet, index) => {
        if (packet.symbol === symbol) {
          [$scope.packets, $scope.dates, $scope.company_symbols, $scope.data].forEach(array => array.splice(index, 1));
        }
      });
    };

  }
)