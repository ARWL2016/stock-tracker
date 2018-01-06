/**
 *  @function getTimeSeriesData - get data for one stock 
 *  @function createPacket - repackage data with new property names
 *  @function extractSymbol - extract the company symbol from the display string (in the search input)
 */

(function(){

  angular.module('app')
    .factory('stockDataService', ['$http', StockDataService]);
    
  function StockDataService($http) {

    var api = {};

    // package data for the controller [private]
    function createPacket (data) {
      var dataset = data.dataset; 
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

    ///// PUBLIC METHODS

    // fetch data for single stock 
    api.getTimeSeriesData = function(company) {
      var symbol = extractSymbol(company);
      
      return $http.get('data/' + symbol)
        .then(function(response) {
          var data = JSON.parse(response.data[0].data_string);
          return createPacket(data);
        })
        .catch(function(err) {
          console.log(err);
          return Promise.reject(err);
        });
    };

    // remove packet from array if it is being added again
    api.addNewPacket = function(newPacket, packets) {
      packets = packets.filter(function(packet) {
        return packet.symbol !== newPacket.symbol;
      }); 
      packets.push(newPacket);
      return packets;
    }

    // export private function for testing
    api._extractSymbol = extractSymbol;
    return api;
  };

}());