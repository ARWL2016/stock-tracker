/**
 *  @prop query - the user search input - selected from companyList
 *  @prop companyList - options on the input served from SymbolService
 *  @prop packets - object containing the name of a stock, its symbol, oldest and newest dates, and the whole data series
 *  
 */

(function(){

  angular.module('app')
    .controller('MainController', ['$routeParams', '$location', 'stockDataService','chartConfig','symbolService', 'chartService', MainController]);

  function MainController($routeParams, $location, dataSvc, chartConfig, symbolSvc, chartSvc) {

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

    vm.getStockData = function(company, symbol) {
      vm.error = '';
      dataSvc.getTimeSeriesData(company, symbol)
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
      var chartData = chartSvc.renderChart(vm.timescale, vm.packets, vm.data, vm.legends);
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
      var symbol = $routeParams.symbol; 
      $location.url('/main');
      if (symbol) {
        return vm.getStockData(null, symbol);
      } 
      vm.getStockData('ASTRAZENECA [AZN]', null);
    };

    init();
  }
  
}());