"use strict";
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = require('./config/express');
var port = process.env.PORT || 3030;

app.listen(port);

console.log('now listening on port: ' + port);

module.exports = app;
