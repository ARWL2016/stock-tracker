if (process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}

const express = require('express');
const path = require('path');
const compression = require('compression');
const ms = require('ms');

const logger = require('./server/config/winston');
const controller = require('./server/controllers');
const { updateData } = require('./server/api');

const app = express();

const port = process.env.PORT || 3000; 
app.use(compression());

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static(path.join(__dirname, 'lib')));

app.get('/data/:id', controller.fetchPricesBySymbol);

app.get('/main', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.get(function(req, res) {
    res.status(404).send();
});

app.listen(port, () => {
    logger.info('listening on port:', port);
});

// the updateData method will collect today's stock data from the API and store in MYSQL 
// perform this in production once when the app is mounted, then once a day
if (process.env.NODE_ENV === 'production') {
  updateData();
  setInterval(function() {
    logger.info('updating...');
    updateData();
}, ms('1d'));
}



