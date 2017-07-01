'use strict';

stockTrackerApp.controller('TestController', 
  function TestController($scope) {
    $scope.message = "hello from test controller";
    console.log('test-contr.js', stockTrackerApp);
  }
)