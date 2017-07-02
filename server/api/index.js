const request = require('request');
const { connection } = require('../../mysql');
const util = require('util');
const mysql = require('mysql');

const key = require('../config').api_key;
let database_code = 'LSE';
let dataset_code = 'RBS';
let rows = 10; 
let interval = ['none', 'daily', 'weekly'][1];
let column = 1; 
let url = `https://www.quandl.com/api/v3/datasets/${database_code}/${dataset_code}.json?api_key=${key}&limit=&collapse=${interval}&column_index=${1}`;

request(url, (err, res, body) => {
  if (err) {
    console.log('error:', error);
  } else { 
    var sql = "INSERT INTO time_series_data (symbol, data_string) VALUES (?, ?)";
    var inserts = [dataset_code, body];
    sql = mysql.format(sql, inserts);
    connection.query(sql, (error, results, fields) => {
      if (error) throw error;
      }); 

    connection.end();
  }
}); 




