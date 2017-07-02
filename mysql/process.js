const companies = require('./stock-symbols.js');

const symbols = companies.map(company => {
  let raw = company.symbol;
  return raw.slice(0, raw.length -2);
});

module.exports = { symbols };
  
