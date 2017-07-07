require('./server/config');

const express = require('express');
const path = require('path');
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

// updateData();
setInterval(function() {
    console.log('updating...');
    updateData();
}, 1000 * 3600 * 24);