describe('Main Controller', function() {
  beforeEach(module('app'));
  
  var $controller, vm;

  beforeEach(angular.mock.inject(function(_$controller_) {
    $controller = _$controller_; 
    vm = $controller('MainController'); 
  }));

  describe('controller', function() {
    it('should be defined', function() {
      expect(vm).toBeDefined();
    });
  });

  describe('companyList', function() {
    it('should be defined', function() {
      expect(vm.companyList).toBeDefined();
    });
  });

  describe('options', function() {
    it('should be defined', function() {
      expect(vm.options).toBeDefined();
    });
  });

  describe('timescale', function() {
    it('should be defined', function() {
      expect(vm.timescale).toBeDefined();
    });
  });

  describe('timescaleSelected', function() {
    it('be set initially to fiveYears', function() {
      expect(vm.timescaleSelected).toEqual('fiveYears')
    });
  });

  describe('changeTimescale method', function() {
    it('should change the timescale', function() {
      vm.timescaleSelected = 'threeMonths';
      vm.changeTimescale();
      expect(vm.timescale.label).toEqual('3mo');
    });
  });

  describe('packets property', function() {
    it('to be intially undefined', function() {
      expect(vm.packets.length).toEqual(0);
    });
  });

  

    
});