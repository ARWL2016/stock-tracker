stockTrackerApp.factory('stockDataService', function($http) {
  var activeData = []; 
  var activeSymbols = [];
  var activePriceData = [];

  function updateActiveData(symbol, data) {
    var { dataset } = data; 
    var packet = { 
      symbol: dataset.dataset_code,
      description: dataset.name,
      newest_available_date: dataset.newest_available_date,
      oldest_available_date: dataset.oldest_available_date, 
      price_data: dataset.data
    }; 
    var tempSym = [];
    var tempPriceData = [];

    activeData = activeData.filter(packet => packet.symbol !== symbol);
    activeData.push(packet); 
    activeData.forEach(packet => {
      tempSym.push(packet.symbol);
      tempPriceData.push(packet.price_data);
    });
    activeSymbols = tempSym;
    activePriceData = tempPriceData; 
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
    },

    getActivePriceData() {
      return activePriceData;
    }

    };
});