var env = require('./config');
var express = require('express');
var app = express();
var router = require('../app/routes/user.routes');
var methodOverride = require('method-override');
var passport = require('passport');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/../public'));

//parse body contents as a JSON objects
app.use(bodyParser.json());

app.use(bodyParser.json({
  type: 'application/vnd.api+json'
}));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}));

/*override with the X-HTTP-Method-Override 
header in the request. simulate DELETE/PUT
*/
app.use(methodOverride('X-HTTP-Method-Override'));

// set up our express application
app.use(morgan('dev'));
app.use(cookieParser()); // read cookies (needed for auth)

// session secret
app.use(passport.initialize());
app.use(passport.session());

require('./passport')(passport);
require('../app/routes/social.routes')(app, passport);

// landing page
app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/public/index');
});

// route trough api
app.use('/', router);

exports = module.exports = app;
