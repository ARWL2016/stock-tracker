describe('Stock Data Service', function() {

  var stockDataService = {};
  
  beforeEach(module('app'));
  beforeEach(angular.mock.inject(function(_stockDataService_) {
    stockDataService = _stockDataService_;
  }));

  it('extractSymbol: should extract the symbol from a string', function() {
    
    expect(stockDataService._extractSymbol('ASTRAZENECA [AZN]')).toEqual('AZN');

  });
});


