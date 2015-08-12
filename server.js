// process.env.NODE_ENV = process.env.NODE_ENV || 'development';
// var app = require('./config/express');
// var port = process.env.PORT || 3000;

// // start app ===============================================
// // startup app at http://localhost:3000
// app.listen(port);

// // shoutout to the user                     
// console.log(port + ' up and running');

// export app           


var express     = require('express'),
    app         = express();

var bodyParser  = require('body-parser'),
    morgan      = require('morgan'),
    port        = process.env.PORT || 5000;
    
app.use(express.static(__dirname + '/public'));

// configure app to sue bodyParser() this will get data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));  // parse application/vnd.api+json as json
app.use(morgan('dev'));

app.get('*', function(req, res) {
  res.sendFile(process.cwd() + '/public/index.html');
});

app.listen(port);
console.log('now listening on port: ' + port);

module.exports = app;