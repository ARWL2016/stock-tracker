stockTrackerApp.factory('stockData', function($http) {
  var activeData = []; 
  var activeSymbols = [];

  function updateActiveData(symbol, data) {
    var obj = { symbol, dataset: data.dataset }; 
    var temp = [];

    activeData = activeData.filter(obj => obj.symbol !== symbol);
    activeData.push(obj); 
    activeData.forEach(obj => temp.push(obj.symbol));
    activeSymbols = temp;
    // console.log('activeSymbols:', activeSymbols); 
    // console.log('activeData: ', activeData); 
  }

  return {
    getTimeSeriesData (query) {
      var symbol = query.toUpperCase(); 
      
      return $http.get(`/data/${symbol}`)
        .then(res => {
          const data = JSON.parse(res.data[0].data_string);
          console.log('http call resolved with this: ', data);
          updateActiveData(symbol, data);
          return true;
        })
        .catch(err => console.log(err));
    },

    getActiveData() {
      return activeData;  
    }, 

    getActiveSymbols() {
      return activeSymbols;
    }

    };
});