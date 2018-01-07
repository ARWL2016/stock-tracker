/**
 * @function updateData - iterates over all companies in mysql/stock-symbols.js and calls QUANDL API. 
 * Data returned is stored in MySQL time_series_data table. 
 * Updates once a day.
 */

'use strict'

const request = require('request');
const mysql = require('mysql');
const logger = require('../config/winston');

const { connection } = require('../../mysql');
const { symbols } = require('../../mysql/process');
const api_key = process.env.QUANDL_API_KEY;

let dataset_code = '';
const interval = ['none', 'daily', 'weekly'][1];

function updateData() {

  let count = 0;

  const singleRequestID = setInterval(function() {
    dataset_code = symbols[count];
    count++;
    if (count >= symbols.length) {
      clearInterval(singleRequestID);
    }
    logger.info(dataset_code);

    const url = `https://www.quandl.com/api/v3/datasets/LSE/${dataset_code}.json?api_key=${api_key}&collapse=${interval}&column_index=1`;

    logger.info('request');
    request(url, (err, res, body) => {
      if (err) {
        logger.info('error:', error);
      } else { 
        const sql = "INSERT INTO time_series_data (symbol, data_string, updated) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE data_string=?, updated=?";
        const inserts = [dataset_code, body, 'false', body, 'true'];
        const formattedSql = mysql.format(sql, inserts);
        
        connection.query(formattedSql, (error, results, fields) => {
          if (error) {
            logger.info(error);
          };
        });  
      }
    }); 
  }, 3000);

}

module.exports = { updateData }

  




