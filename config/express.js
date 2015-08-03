var env = require('./env.config.js');
var dotenv = require('dotenv');

dotenv.load(env.development);

var express = require('express');
var app = express();


var methodOverride = require('method-override');
var mongoose = require('mongoose');
var passport = require('passport');
var morgan = require('morgan');
var multer = require('multer');
var path = require('path');
var cloudinary = require('cloudinary');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//parse body contents as a JSON objects
app.use(bodyParser.json());

app.use(bodyParser.json({
  type: 'application/vnd.api+json'
}));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}));

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

// set up our express application
app.use(morgan('dev'));
app.use(cookieParser()); // read cookies (needed for auth)

// session secret
app.use(passport.initialize());
app.use(passport.session());

//route trough api
//app.use('/api');

exports = module.exports = app;
