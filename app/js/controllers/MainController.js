/**
 *  @prop query - the user search input - selected from companyList
 *  @prop companyList - options on the input 
 *  @prop packets - object containing the name of a stock, its symbol, oldest and newest dates, and the whole data series
 *  
 */

(function(){

  angular.module('app')
    .controller('MainController', ['stockDataService','chartConfig','symbolService', 'utilsService', MainController]);

  function MainController(dataSvc, chartConfig, symbolSvc, utils) {

    var vm = this;

    vm.query = '';
    vm.companyList = symbolSvc.index();

    // HTTP response data 
    vm.packets = [];

    // chart data (computed from packets)
    vm.dates = [];
    vm.legends = []; 
    vm.data = []; 

    // chart metadata
    vm.datasetOverride = [{ yAxisID: 'y-axis-1' }];
    vm.timescaleSelected = 'fiveYears'; 
    vm.options = chartConfig.OPTIONS;
    vm.timescale = chartConfig.TIMESCALE[vm.timescaleSelected];

    vm.error = '';

    function init() {
      vm.getStockData('ASTRAZENECA [AZN]');
    };

    vm.getStockData = function(company) {
      vm.error = '';
      dataSvc.getTimeSeriesData(company)
        .then(function(newPacket) {
          vm.query = '';
          vm.packets = dataSvc.addNewPacket(newPacket, vm.packets);
          vm.renderChart(); 
        })
        .catch(function(err) {
          vm.error = 'Sorry, data not available';
        });
    };

    vm.renderChart = function() {
      resetChartData();
      var chartData = utils.renderChart(vm.timescale, vm.packets, vm.data, vm.dates, vm.legends);
      vm.data = chartData.data; 
      vm.dates = chartData.dates; 
      vm.legends = chartData.legends; 

      ///

      // var datesArray = [];
      // var dataArray = [];
      // var divisor = vm.timescale.divisor; 
      // var seriesLength = vm.timescale.seriesLength;

      // vm.packets.forEach(function(packet, packetIndex) {

      //   packet.price_data.forEach(function(price, priceIndex) {
      //     if (priceIndex < seriesLength && (priceIndex % divisor === 0)) {
      //       dataArray.unshift(price[1]);
      //       if (packetIndex === 0) {
      //         var trimmedDate = utils.trimDate(divisor, price[0]);
      //         datesArray.unshift(trimmedDate);
      //       }
      //     }
      //   }); 

      //   vm.data.push(dataArray); 
      //   dataArray = []; 
      //   vm.dates = datesArray; 
      //   vm.legends.push(packet.symbol);  
      // }); 
    }


    resetChartData = function() {
      vm.data = [];
      vm.dates = [];
      vm.legends = [];
    }

    vm.removeData = function (symbol) {
      vm.packets.forEach(function(packet, index) {
        if (packet.symbol === symbol) {
          [vm.packets, vm.dates, vm.legends, vm.data].forEach(function(array) {
            array.splice(index, 1)
          });
        }
      });
    };

    vm.changeTimescale = function() {
      vm.timescale = chartConfig.TIMESCALE[vm.timescaleSelected];
      vm.renderChart();
    }

    init();


  }


}());