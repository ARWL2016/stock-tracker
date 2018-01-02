require('./server/config');

const express = require('express');
const path = require('path');
const https = require('https');
const compression = require('compression');

const controller = require('./server/controllers');
const { updateData } = require('./server/api');

const app = express();

const port = process.env.PORT || 3000; 
app.use(compression());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/data/:id', controller.fetchPricesBySymbol);

app.get('*', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(port, () => {
    console.log('listening on port:', port);
});

// the updateData method will collect today's stock data from the API and store in MYSQL 
// perform this in production once when the app is mounted, then once a day
if (process.env.NODE_ENV !== 'development') {
  updateData();
  setInterval(function() {
    console.log('updating...');
    updateData();
}, 1000 * 3600 * 24);
}



