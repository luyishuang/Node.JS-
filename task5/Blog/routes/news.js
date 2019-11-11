var express = require('express');
var router = express.Router();

/* GET news listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource news');
  });
  
  router.get('/list', function(req, res, next) {
    res.send('news list');
  });
  
  module.exports = router;
