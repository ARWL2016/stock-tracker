const mysql = require('mysql');

const connection = mysql.createConnection({

  host: 'localhost', 
  port: 4000,
  user: 'alistairrwillis',
  password: 'Mko0987uj??',
  database: 'stocko'

});

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