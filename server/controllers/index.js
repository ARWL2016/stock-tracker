"use strict"; 

const mysql = require('mysql');
const { connection } = require('../../mysql');

function fetchPricesBySymbol(req, res) {
  const id = req.params.id;

  let sql = "SELECT data_string FROM time_series_data WHERE symbol=?";
  const inserts = [id];

  sql = mysql.format(sql, inserts);
  connection.query(sql, (error, results, fields) => {
    if (error) {
      console.log(error);
      res.status(404); 
    }; 
    res.status(200).send(results); 

  });

  
}

module.exports = {
  fetchPricesBySymbol
}