'use strict' 

/**
 *  Create the mysql connection in development (local) or production mode (cloud).
 *  Attempt to connect. Log error or connection config data. 
 *  Export connection. 
 */

const mysql = require('mysql');
const logger = require('../server/config/winston');

const env = process.env.NODE_ENV || 'development';
let connection;

// configure the connection
if (env === 'development') {
    connection = mysql.createConnection({
    host: 'localhost',
    port: 4000,
    user: 'alistairrwillis',
    password: process.env.MYSQL_PASSWORD,
    database: 'fsbc02887yotlrsu'
  });
} else {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
}

connection.connect(err => {
    if (err) {
        logger.info(`error connecting: ${err.stack}`);
        return;
    }

    logger.info(`database: connected to local MYSQL instance at ${connection.config.host}:${connection.config.port} with ID: ${connection.threadId}`);
});

module.exports = { connection };