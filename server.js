const express = require('express'); 
const path = require('path');
const request = require('request');
const chalk = require('chalk');
const app = express(); 

app.use(express.static(path.join(__dirname, 'app'))); 

const key = require('./config.json').QUANDL_API_KEY;
let database_code = 'LSE';
let dataset_code = 'RBS';
let rows = 10; 
let interval = ['none', 'daily', 'weekly'][2];
let column = 1; 
// Daily prices for specific company over last 10 years
let url = `https://www.quandl.com/api/v3/datasets/${database_code}/${dataset_code}.json?api_key=${key}&limit=${rows}&collapse=${interval}&column_index=${column}`;

var results; 

var start = Date.now(); 
console.log(start);
var finish;
request(url, (error, response, body) => {
  console.log('error:', error); 
  console.log('statusCode:', response && response.statusCode); 
  results = JSON.parse(response.body);
  console.log('results:', results.dataset.description); 
  finish = Date.now(); 
  console.log(finish); 
  console.log(finish - start);

}); 

app.get('/data', (req, res) => {
  res.send(results);
  res.end();
});

// app.get('*', function(req, res) { 
//   res.sendFile(__dirname + '/app/index.html'); 
// });


app.listen(3000, () => {
  console.log(chalk.green('listening on port 3000')); 
})




