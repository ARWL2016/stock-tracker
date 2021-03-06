/**
 *  Contains utility methods for rendering the stock data chart
 */

(function(){

  angular.module('app')
    .factory('chartService', [ChartService]);

  function ChartService() {

    // remove date of the month for more than 6mo data series
    function trimDate(divisor, date) {
      if (divisor === 1 || divisor === 2) {
        return date;
      } 
      return date.slice(0,7);
    }

    function renderChart(timescale, packets, data, legends) {
      var dates = [];
      var temp = [];
      var divisor = timescale.divisor; 
      var seriesLength = timescale.seriesLength;

      packets.forEach(function(packet, packetIndex) {

        packet.price_data.forEach(function(price, priceIndex) {
          if (priceIndex < seriesLength && (priceIndex % divisor === 0)) {
            temp.unshift(price[1]);
            if (packetIndex === 0) {
              var trimmedDate = trimDate(divisor, price[0]);
              dates.unshift(trimmedDate);
            }
          }
        }); 

        data.push(temp); 
        temp = [];  
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
      renderChart: renderChart
    }
  }


}());