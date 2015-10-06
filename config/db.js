var config = require('./config');
var mongoose = require('mongoose');

// create the database connection
mongoose.connect(config.database);

// when the connection starts
mongoose.connection.on('connected', function () {
  console.log('Connection open to ' + config.database);
});

// log error if error occurs
mongoose.connection.on('error', function (err) {
  console.log('Connection error: ' + err);
});

// when the connection ends
mongoose.connection.on('disconnected', function () {
  console.log('Connection to ' + config.database +' is closed');
});

// close the connection if node process ends
process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Connection closed through app termination');
    process.exit(0);
  });
});