/**
 *  Contains configuration properties for the line chart. 
 *  http://jtblin.github.io/angular-chart.js/
 *  
 */

(function(){

  angular.module('app')
    .constant('chartConfig', {

    OPTIONS: {
      layout: {
        padding: 20
      },
      title: {
        display: true,
        text: 'London Stock Exchange FTSE 100'
      },
      responsive: true,
      elements: {
        line: {
          tension: 1
        }, 
        point: {
          radius: 1
        }
      },
      showLines: true,
      legend: {
        display: true, 
        position: 'right'
      },
      scales: {
        yAxes: [
          {
            id: 'y-axis-1',
            type: 'linear',
            display: true,
            position: 'left', 
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    },
    
    TIMESCALE: {
      threeMonths: {
        divisor: 1, 
        seriesLength: 65, 
        label: '3mo'
      }, 
      sixMonths: {
        divisor: 2, 
        seriesLength: 130, 
        label: '6mo'
      }, 
      oneYear: {
        divisor: 4, 
        seriesLength: 260, 
        label: '1yr'
      }, 
      twoYears: {
        divisor: 8, 
        seriesLength: 520, 
        label: '2yrs'
      },
      fiveYears: {
        divisor: 20, 
        seriesLength: 1300, 
        label: '5yrs'
      }
    }

  });

}());