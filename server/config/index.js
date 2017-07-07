const env = process.env.NODE_ENV || 'development';


if (env === 'development') {
  const config = require('./development.json');
  process.env.QUANDL_API_KEY = config.QUANDL_API_KEY;
  process.env.MYSQL_PASSWORD = config.MYSQL_PASSWORD;

  console.log('ENV: ', env);
  console.log('config:', config);
}


