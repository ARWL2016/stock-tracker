stockTrackerApp.factory('stockData', function($http) {
    var currentData = []; 
    var currentSymbols = [];

    function updateCurrentData(symbol, data) {
      var obj = { 
        symbol: symbol, 
        data: data 
      }; 
      currentData = currentData.filter(obj => {
        return obj.symbol !== symbol;
      })
      currentData.push(obj); 
      var temp = [];
      currentData.forEach(obj => {
        temp.push(obj.symbol);  
      });
      currentSymbols = temp;
      console.log('currentSymbols:', currentSymbols); 
      console.log('currentData: ', currentData); 
    }

    return {
      getTimeSeriesData: function(symbol) {
        var symbol = symbol.toUpperCase(); 
        
        return $http.get(`/data/${symbol}`)
          .then(function success(res) {
            var data = JSON.parse(res.data[0].data_string);
            console.log('http call resolved with this: ', data);
            updateCurrentData(symbol, data);
            return Promise.resolve(); 
           
          })
          .catch(function error(err) {
            console.log(err);
          })
      },

      getCurrentData: function() {
        return currentData;  
      }, 

      getCurrentSymbols: function() {
        return currentSymbols;
      }


      
 
    };
});