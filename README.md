### Stock Tracker

#### Useful Links 
https://www.freecodecamp.com/challenges/chart-the-stock-market   
https://docs.quandl.com/docs/parameters-2 
http://jtblin.github.io/angular-chart.js/ 

#### To Do  
- add IIFEs and strict mode
- add error checking

#### Tech 
- angular 1.6.4
- angular-route 1.6.4 (ie the native router)
- normalize-css 
- node 8.9.3 
- express 4.15.3
- mysql 2/13
- chartjs 2.6.0 (CDN)
- angular-chart.js (CDN) 

#### Notes 
- as the front end Javascript is not transpiled, ES6 features are avoided to keep it compatible with older browsers

#### Run this App in Development
- clone repo 
- `npm install` to install server side dependencies
- front end dependencies are found in public/lib (included in repo - or reinstalled with Bower)
- the development version requires a local instance of mysql - see the database dump in mysql/
- `npm run dev` - runs the app in development mode

#### Development Database 
- Connection name: Python 
- Port: 4000
- Name: `fsbc02887yotlrsu`
- Table: `time_series_data`

#### Production 
- Hosting: heroku 
- Persistence: JawsDB (cloud MySQL provider)

 
