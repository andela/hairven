var express = require('express');
var hairCntrl = require('../controllers/hairstyle.controller');
var router = express.Router();

router.get('/', function(req, res) {
  res.sendFile('index.html', {'root': './'});
});

module.exports = router;
