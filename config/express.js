var config = require('./config');
var express = require('express');
var app = express();
var router = express.Router();
var routes = require('../app/routes/');

var methodOverride = require('method-override');
var passport = require('passport');
var morgan = require('morgan');
var multer = require('multer');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var db = require('./db');


routes(router);

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

app.use(session({
  secret: 'rosco',
  saveUninitialized: true,
  resave: false
}));

//multer properties for saving into file with an assigned name.
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './temp/');
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now('mm/dd/yyyy'));
  }
});

app.use(multer({
  storage: storage
}).single('hairPhoto'));

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

// landing page
app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/public/index');
});

// route trough api
app.use('/', router);

exports = module.exports = app;
