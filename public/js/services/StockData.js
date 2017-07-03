stockTrackerApp.factory('stockData', function($http) {
  var currentData = []; 
  var currentSymbols = [];

  function updateCurrentData(symbol, data) {
    var obj = { symbol, data }; 
    var temp = [];

    currentData = currentData.filter(obj => obj.symbol !== symbol);
    currentData.push(obj); 
    currentData.forEach(obj => temp.push(obj.symbol));
    currentSymbols = temp;
    console.log('currentSymbols:', currentSymbols); 
    console.log('currentData: ', currentData); 
  }

  return {
    getTimeSeriesData (query) {
      var symbol = query.toUpperCase(); 
      
      return $http.get(`/data/${symbol}`)
        .then(res => {
          const data = JSON.parse(res.data[0].data_string);
          console.log('http call resolved with this: ', data);
          updateCurrentData(symbol, data);
          return data;
        })
        .catch(err => console.log(err));
    },

    getCurrentData() {
      return currentData;  
    }, 

    getCurrentSymbols() {
      return currentSymbols;
    }

    };
});