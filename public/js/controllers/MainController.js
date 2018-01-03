'use strict';

app.controller('MainController',

  function MainController($scope, stockDataService, chartConfigService, symbolService) {

    $scope.symbolInput = '';
    $scope.companyIndex = symbolService.index;
    // active data repository
    $scope.packets = [];

    // chart data 
    $scope.dates = []; // x-axis 
    $scope.company_symbols = []; // stores the legend for each data series 
    $scope.data = []; // stores an array for each data series
    $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }];
    $scope.options = chartConfigService.options;
    $scope.timescaleSelected = 'fiveYears'; 
    $scope.timescale = chartConfigService.timescale[$scope.timescaleSelected];

    $scope.getStockData = (company) => {
      const symbol = company.split('[')[1].slice(0, -1); 
      stockDataService.getTimeSeriesData(symbol)
        .then(newPacket => {
          if (newPacket) {
            console.log('newPacket: ', newPacket);
            $scope.symbolInput = '';

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
      let divisor = $scope.timescale.divisor; 
      let seriesLength = $scope.timescale.seriesLength;

      $scope.packets.forEach((packet, packetIndex) => {
        packet.price_data.forEach((price, priceIndex) => {
          if (priceIndex < seriesLength && (priceIndex % divisor === 0)) {
            dataArray.unshift(price[1]);
            if (packetIndex === 0) {
              // remove the date when timescale is > 6 months 
              const trimmedDate = divisor === 1 || divisor === 2 ? price[0] : price[0].slice(0, 7);
              datesArray.unshift(trimmedDate);
            }
          }
        }); 
        $scope.data.push(dataArray); 
        dataArray = []; 
        $scope.dates = datesArray; 

      $scope.company_symbols.push(packet.symbol);  
      }); 
    }

    $scope.removeData = (symbol) => {
      $scope.packets.forEach((packet, index) => {
        if (packet.symbol === symbol) {
          [$scope.packets, $scope.dates, $scope.company_symbols, $scope.data].forEach(array => array.splice(index, 1));
        }
      });
    };

    $scope.changeTimescale = () => {
      console.log('change', $scope.timescaleSelected);
      $scope.timescale = chartConfigService.timescale[$scope.timescaleSelected];
      $scope.renderChart();
    }

    const init = () => {
      $scope.getStockData('HSBC HLDG [HSBA]');
    };
    init(); 

  }
)
