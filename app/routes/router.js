var express = require('express');
var router = express.Router();

router.get('/', function(res) {
  res.sendFile('index.html', {'root': './'});
});

module.exports = router;
