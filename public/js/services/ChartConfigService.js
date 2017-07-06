stockTrackerApp.factory('chartConfigService', function() {

      const options = {
      layout: {
        padding: 20
      },
      responsive: false,
      elements: {
        line: {
          tension: 0
        }, 
        point: {
          radius: 3
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
    };
    return {
      returnOptions() {
        return options;
      }
    }
});