if (process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}

const express = require('express');
const path = require('path');
const compression = require('compression');
const ms = require('ms');
const helmet = require('helmet');
const express_enforces_ssl = require('express-enforces-ssl');

const logger = require('./server/config/winston');
const controller = require('./server/controllers');
const { updateData } = require('./server/api');

const app = express();
const port = process.env.PORT || 3000; 

app.use(helmet());
app.use(helmet.referrerPolicy({ policy: 'same-origin' }));

if (process.env.NODE_ENV === 'production') {
  app.enable('trust proxy');
  app.use(express_enforces_ssl());
  app.use(helmet.hsts({
    maxAge: ms('1 year'),
    includeSubdomains: true
  }));
  app.use(compression());
}

// static server for libraries
app.use(express.static(path.join(__dirname, 'lib'), { maxAge: ms('1yr') }));

// static server for application code
app.use(express.static(path.join(__dirname, 'app')));

app.get('/data/:id', controller.fetchPricesBySymbol);

app.get('*', function(req, res) {
  res.sendFile(__dirname + '/app/index.html');
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



