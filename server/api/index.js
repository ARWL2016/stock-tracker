const request = require('request');
const mysql = require('mysql');
const { connection } = require('../../mysql');
const { symbols } = require('../../mysql/process');
const { api_key } = require('../config');

let dataset_code = '';
let interval = ['none', 'daily', 'weekly'][1];

var count = 15;

  var singleRequestID = setInterval(function() {
    dataset_code = symbols[count];
    count++;
    if (count > 18) {
      clearInterval(singleRequestID);
    }
    console.log(dataset_code);

    let url = `https://www.quandl.com/api/v3/datasets/LSE/${dataset_code}.json?api_key=${api_key}&collapse=${interval}&column_index=1`;

    console.log('request');
    request(url, (err, res, body) => {
      if (err) {
        console.log('error:', error);
      } else { 
        var sql = "INSERT INTO time_series_data (symbol, data_string, updated) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE data_string=?, updated=?";
        var inserts = [dataset_code, body, 'false', body, 'true'];
        sql = mysql.format(sql, inserts);
        connection.query(sql, (error, results, fields) => {
          if (error) throw error;
        });  
      }
    }); 
  }, 3000);

  




