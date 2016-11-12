var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/index', function(req, res, next){
  res.render('index', { title: 'Express',body:"" });
});

/*router.get('/friends', function(req, res, next){
  res.render('friends', { title: 'Express',body:"" });
});*/

module.exports = router;
