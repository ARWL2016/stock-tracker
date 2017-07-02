const companies = require('./stock-symbols.js');

let symbols = companies.map(company => {
   return company.symbol; 
});

console.log(symbols);

module.exports = {
  symbols
}
  
