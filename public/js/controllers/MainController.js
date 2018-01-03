(function(){

  angular.module('app')
    .controller('MainController', ['stockDataService','chartConfigService','symbolService', '$log', MainController]);

  function MainController(stockDataService, chartConfigService, symbolService, $log) {

    var vm = this;

    vm.symbolInput = '';
    vm.companyIndex = symbolService.index;
    // active data repository
    vm.packets = [];

    // chart data 
    vm.dates = []; // x-axis 
    vm.company_symbols = []; // stores the legend for each data series 
    vm.data = []; // stores an array for each data series
    vm.datasetOverride = [{ yAxisID: 'y-axis-1' }];
    vm.options = chartConfigService.options;
    vm.timescaleSelected = 'fiveYears'; 
    vm.timescale = chartConfigService.timescale[vm.timescaleSelected];

    vm.getStockData = (company) => {
      var symbol = company.split('[')[1].slice(0, -1); 
      stockDataService.getTimeSeriesData(symbol)
        .then(newPacket => {
          if (newPacket) {
            $log.debug('newPacket: ', newPacket);
            vm.symbolInput = '';

            // remove duplicate packets 
            vm.packets = vm.packets.filter(packet => packet.symbol !== newPacket.symbol);
            vm.packets.push(newPacket);

            vm.renderChart(); 
          }
        })
    };

    vm.renderChart = () => {
      vm.company_symbols = [];
      vm.data = [];
      vm.dates = [];

      var datesArray = [];
      var dataArray = [];
      var divisor = vm.timescale.divisor; 
      var seriesLength = vm.timescale.seriesLength;

      vm.packets.forEach((packet, packetIndex) => {
        packet.price_data.forEach((price, priceIndex) => {
          if (priceIndex < seriesLength && (priceIndex % divisor === 0)) {
            dataArray.unshift(price[1]);
            if (packetIndex === 0) {
              // remove the date when timescale is > 6 months 
              var trimmedDate = divisor === 1 || divisor === 2 ? price[0] : price[0].slice(0, 7);
              datesArray.unshift(trimmedDate);
            }
          }
        }); 
        vm.data.push(dataArray); 
        dataArray = []; 
        vm.dates = datesArray; 

      vm.company_symbols.push(packet.symbol);  
      }); 
    }

    vm.removeData = (symbol) => {
      vm.packets.forEach((packet, index) => {
        if (packet.symbol === symbol) {
          [vm.packets, vm.dates, vm.company_symbols, vm.data].forEach(array => array.splice(index, 1));
        }
      });
    };

    vm.changeTimescale = () => {
      console.log('change', vm.timescaleSelected);
      vm.timescale = chartConfigService.timescale[vm.timescaleSelected];
      vm.renderChart();
    }

    var init = () => {
      vm.getStockData('HSBC HLDG [HSBA]');
    };
    init(); 
    console.log({vm});

  }


}());