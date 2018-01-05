(function(){

  angular.module('app')
    .factory('utilsService', [UtilsService]);

  function UtilsService() {

    // remove date of the month for more than 6mo data series
    function trimDate(divisor, date) {
      if (divisor === 1 || divisor === 2) {
        return date;
      } 
      return date.slice(0,7);
    }

    function renderChart(timescale, packets, data, dates, legends) {
      var datesArray = [];
      var dataArray = [];
      var divisor = timescale.divisor; 
      var seriesLength = timescale.seriesLength;

      packets.forEach(function(packet, packetIndex) {

        packet.price_data.forEach(function(price, priceIndex) {
          if (priceIndex < seriesLength && (priceIndex % divisor === 0)) {
            dataArray.unshift(price[1]);
            if (packetIndex === 0) {
              var trimmedDate = trimDate(divisor, price[0]);
              datesArray.unshift(trimmedDate);
            }
          }
        }); 

        data.push(dataArray); 
        dataArray = []; 
        dates = datesArray; 
        legends.push(packet.symbol);
      }); 

      return {
        data: data, 
        dates: dates, 
        legends: legends
      }

    }

    return {
      trimDate: trimDate, 
      renderChart: renderChart,
      removeData: removeData
    }
  }


}());