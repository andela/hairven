<<<<<<< HEAD
'use strict';
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var app = require('./config/express');
var port = process.env.PORT || 5000;
=======
"use strict";
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = require('./config/express');
var port = process.env.PORT || 5000;

>>>>>>> Refactor(Server): Refactor server to load public/index

app.listen(port);

console.log('now listening on port: ' + port);

module.exports = app;
