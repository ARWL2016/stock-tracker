(function(){

  angular.module('app')
    .controller('MainController', ['stockDataService','chartConfig','symbolService', MainController]);

  function MainController(stockDataService, chartConfig, symbolService, $log) {

    var vm = this;

    vm.symbolInput = '';
    vm.companyIndex = symbolService.index();
    // active data repository
    vm.packets = [];

    // chart data 
    vm.dates = []; // x-axis 
    vm.company_symbols = []; // stores the legend for each data series 
    vm.data = []; // stores an array for each data series
    vm.datasetOverride = [{ yAxisID: 'y-axis-1' }];
    vm.options = chartConfig.OPTIONS;
    vm.timescaleSelected = 'fiveYears'; 
    vm.timescale = chartConfig.TIMESCALE[vm.timescaleSelected];

    vm.error = '';

    function init() {
      vm.getStockData('ASTRAZENECA [AZN]');
    };

    vm.getStockData = function(company) {
      vm.error = '';
      stockDataService.getTimeSeriesData(company)
        .then(function(newPacket) {
          if (newPacket) {
            console.log('newPacket: ', newPacket);
            vm.symbolInput = '';

            // remove duplicate packets 
            vm.packets = vm.packets.filter(packet => packet.symbol !== newPacket.symbol);
            vm.packets.push(newPacket);

            vm.renderChart(); 
          }
        })
        .catch(function(err) {
          vm.error = 'Sorry, data not available';
        });
    };

    vm.renderChart = function() {
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

    vm.removeData = function (symbol) {
      vm.packets.forEach((packet, index) => {
        if (packet.symbol === symbol) {
          [vm.packets, vm.dates, vm.company_symbols, vm.data].forEach(array => array.splice(index, 1));
        }
      });
    };

    vm.changeTimescale = function() {
      console.log('change' + vm.timescaleSelected);
      vm.timescale = chartConfig.TIMESCALE[vm.timescaleSelected];
      vm.renderChart();
    }

    
    init();


  }


}());