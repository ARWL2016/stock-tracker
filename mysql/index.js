const mysql = require('mysql');

var env = process.env.NODE_ENV || 'development', connection;

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

connection.connect((err) => {
    if (err) {
        console.log('error connecting: ' + err.stack);
        return;
    }

    console.log(`connected to ${connection.config.host}:${connection.config.port} with ID: ${connection.threadId}`);
});

module.exports = {
    connection
}