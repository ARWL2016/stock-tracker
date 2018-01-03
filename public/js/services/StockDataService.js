/**
 *  @function getTimeSeriesData - get data for one stock 
 *  @function createPacket - repackage data with new property names
 *  @function extractSymbol - extract the company symbol from the display string (in the search input)
 */

(function(){

  angular.module('app')
    .factory('stockDataService', ['$http', StockDataService])
    
  function StockDataService($http) {

    // package data for the controller [private]
    function createPacket (data) {
      var { dataset } = data; 
      return { 
        symbol: dataset.dataset_code,
        description: dataset.name,
        newest_available_date: dataset.newest_available_date,
        oldest_available_date: dataset.oldest_available_date, 
        price_data: dataset.data
      }; 
    };

    function extractSymbol(company) {
      return company.split('[')[1].slice(0, -1); 
    }

    // fetch data for single stock
    function getTimeSeriesData (company) {
      var symbol = extractSymbol(company);
      
      return $http({
        method: 'GET', 
        url: 'data/' + symbol
      })
        .then(function(response) {
          var data = JSON.parse(response.data[0].data_string);
          console.log('http call resolved with this: ', data);
          return createPacket(data);
        })
        .catch(function(err) {
          console.log(err);
          return Promise.reject(err);
        });
      };

      return { getTimeSeriesData };
  };

}());