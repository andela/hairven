
var app = require('./config/express');
var port = process.env.PORT || 3000;

// start app ===============================================
// startup app at http://localhost:3000
app.listen(port);

// shoutout to the user                     
console.log(port + ' up and running');

// expose app           
exports = module.exports = app;
