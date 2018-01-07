/**
 *  @function getTimeSeriesData - get data for one stock from backend - call with EITHER company OR symbol and pass null for other
 *  @function createPacket - repackage data with new property names
 *  @function extractSymbol - extract the company symbol from the display string (in the search input)
 *  @function addNewPacket - add new packet to data array and remove duplicates
 */

(function(){

  angular.module('app')
    .factory('stockDataService', ['$http', StockDataService]);
    
  function StockDataService($http) {

    var api = {};

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

    api.getTimeSeriesData = function(company) {
      var symbol = extractSymbol(company);
  
      return $http.get('data/' + symbol)
        .then(function(response) {
          var data = JSON.parse(response.data[0].data_string);
          return createPacket(data);
        })
        .catch(function(err) {
          return Promise.reject(err);
        });
    };

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