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
      var chartData = utils.renderChart(vm.timescale, vm.packets, vm.data, vm.legends);
      vm.data = chartData.data; 
      vm.dates = chartData.dates; 
      vm.legends = chartData.legends; 
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

    resetChartData = function() {
      vm.data = [];
      vm.dates = [];
      vm.legends = [];
    }

    function init() {
      vm.getStockData('ASTRAZENECA [AZN]');
    };

    init();
  }


}());