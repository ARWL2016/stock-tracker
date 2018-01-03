app.factory('stockDataService', function($http) {

  // package data for the controller 
  const createPacket = (data) => {
    var { dataset } = data; 
    return { 
      symbol: dataset.dataset_code,
      description: dataset.name,
      newest_available_date: dataset.newest_available_date,
      oldest_available_date: dataset.oldest_available_date, 
      price_data: dataset.data
    }; 
  };

  return {
    getTimeSeriesData (query) {
      const symbol = query.toUpperCase(); 
      
      return $http.get(`/data/${symbol}`)
        .then(response => {
          const data = JSON.parse(response.data[0].data_string);
          console.log('http call resolved with this: ', data);
          return createPacket(data);
        })
        .catch(err => console.log(err));
      },
    };
});