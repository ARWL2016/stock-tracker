'use strict'

const companies = require('./stock-symbols.js');

// generate an array of stock symbols for querying the quandl API
const symbols = companies.map(company => {
  let raw = company.symbol;

  // remove the '.L' from the stock symbols - not needed in quandl API request
  return raw.slice(0, raw.length -2);
});

module.exports = { symbols };
  
