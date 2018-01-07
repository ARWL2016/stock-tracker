/**
 * @function fetchPricesBySymbol - fetches stock data for one stock from MySQL 
 */

"use strict"; 

const mysql = require('mysql');
const { connection } = require('../../mysql');
const logger = require('../config/winston');
const util = require('util');

function fetchPricesBySymbol(req, res) {
  const id = req.params.id;

  let sql = "SELECT data_string FROM time_series_data WHERE symbol=?";
  const inserts = [id];

  sql = mysql.format(sql, inserts);
  connection.query(sql, (error, results, fields) => {
    if (error) {
      logger.info(error);
      res.status(500); 
    }; 
    if (results.length === 0) {
      res.status(404).send('no data found for ' + id); 
    } else {
      res.status(200).send(results); 
    }
  });
}

module.exports = {
  fetchPricesBySymbol
}