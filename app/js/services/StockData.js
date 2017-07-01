stockTrackerApp.factory('stockData', function($http) {

  // var key = require('../../../config.json').QUANDL_API_KEY;

  var database_code = 'LSE';
  var dataset_code = 'RBS';
  var rows = 10; 
  var interval = ['none', 'daily', 'weekly'][2];
  var column = 1; 
// Daily prices for specific company over last 10 years
var url = `https://www.quandl.com/api/v3/datasets/${database_code}/${dataset_code}.json?api_key=${key}&limit=${rows}&collapse=${interval}&column_index=${column}`;

    return {
      getTimeSeriesData: function() {
        console.log(url);
        return $http({method: 'GET', url: url});
      }
    };
});