describe('Stock Data Service', function() {

  beforeEach(module('app'));

    it('should extract the symbol from a string', function() {
      
      var stockDataService = {};


      angular.mock.inject(function(_stockDataService_) {
        stockDataService = _stockDataService_;
      });

      expect(stockDataService._extractSymbol('ASTRAZENECA [AZN]')).toEqual('AZN');

    });
});


