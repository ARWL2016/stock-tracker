(function(){ 

  angular.module('app')
    .controller('CompanyController', [ 'symbolService', CompanyController]); 

  function CompanyController(symbolSvc) {

    var vm = this;
    
    vm.companyList = symbolSvc.index();
  }

}());

