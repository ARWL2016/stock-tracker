stockTrackerApp.factory('stockData', function($http) {
    var currentData = []; 

    function updateCurrentData(symbol, data) {
      var obj = { symbol: data }; 
      currentData = currentData.filter(obj => {
        return obj.symbol !== symbol;
      })
      currentData.push(obj); 
      console.log(currentData); 
    }

    return {
      getTimeSeriesData: function(symbol) {
        console.log('Data Service:', symbol);
        $http.get(`/data/${symbol}`)
          .then(function success(res) {
            var data = JSON.parse(res.data[0].data_string);
            console.log(data);
            updateCurrentData(symbol, data);
           
          })
          .catch(function error(err) {
            console.log(err);
          })
      }
 
    };
});