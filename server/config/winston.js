const winston = require('winston');

const logger = new winston.Logger({
  transports: [
    new (winston.transports.Console) ({
      level: 'debug',
      colorize: true, 
      json: false
    })
  ]
});

module.exports = logger ;