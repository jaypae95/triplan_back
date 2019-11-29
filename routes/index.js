var express = require('express');
var router = express.Router();
var db = require('./db');
/* GET home page. */
router.get('/', function (req, res, next) {
  db.query('SELECT * FROM triplan.Continent', function (err, res, fields) {
    console.log(res);
  });
  res.render('index', {title: 'Express'});
});

module.exports = router;
