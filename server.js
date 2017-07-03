const express = require('express'); 
const path = require('path');
const compression = require('compression');
const chalk = require('chalk');
const controller = require('./server/controllers');

const app = express(); 
app.use(compression());

app.use(express.static(path.join(__dirname, 'public'))); 

app.get('/data/:id', controller.fetchPricesBySymbol);

app.get('*', function(req, res) { 
  res.sendFile(__dirname + '/public/index.html'); 
});


app.listen(3000, () => {
  console.log(chalk.green('listening on port 3000')); 
})




