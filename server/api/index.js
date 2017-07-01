const request = require('request');

const key = require('../config').api_key;
let database_code = 'LSE';
let dataset_code = 'RBS';
let rows = 10; 
let interval = ['none', 'daily', 'weekly'][2];
let column = 1; 
let url = `https://www.quandl.com/api/v3/datasets/${database_code}/${dataset_code}.json?api_key=${key}&limit=${rows}&collapse=${interval}&column_index=${column}`;

var results; 

request(url, (err, res, body) => {
  if (err) {
    console.log('error:', error);
  } else {
    results = JSON.parse(body);
    console.log('results:', results.dataset); 
  }
   
}); 

