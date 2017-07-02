stockTrackerApp.factory('stockData', function($http) {

    return {
      getTimeSeriesData: function(symbol) {
        console.log(symbol);
      }
    };
});