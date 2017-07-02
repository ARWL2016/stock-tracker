const request = require('request');
const { connection } = require('../../mysql');
const mysql = require('mysql');

const { symbols } = require('../../mysql/process');

const key = require('../config').api_key;
let database_code = 'LSE';
let dataset_code;
let rows = 10; 
let interval = ['none', 'daily', 'weekly'][1];
let column = 1; 


var count = 0;

  var singleRequestID = setInterval(function() {
    dataset_code = symbols[count];
    count++;
    if (count > 5) {
      clearInterval(singleRequestID);
    }
    console.log(dataset_code);

    let url = `https://www.quandl.com/api/v3/datasets/${database_code}/${dataset_code}.json?api_key=${key}&limit=&collapse=${interval}&column_index=${1}`;

    console.log('request');
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
      }
    }); 
  }, 3000);

  




