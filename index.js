const express = require('express'); 
const path = require('path');

const compression = require('compression');
const chalk = require('chalk');

const app = express(); 
app.use(compression());

app.use(express.static(path.join(__dirname, 'public'))); 

// app.get('*', function(req, res) { 
//   res.sendFile(__dirname + '/app/index.html'); 
// });

app.get('/data', (req, res) => {
  res.send(parsedResults);
  res.end();
});

app.listen(3000, () => {
  console.log(chalk.green('listening on port 3000')); 
})




