const express = require('express');
const router = express.Router();
const db = require('./db');
/* GET home page. */
router.get('/', function (req, res, next) {
  db.connection.query('SELECT * FROM triplan.Continent', function (err, res, fields) {
    console.log(res);
  });
  res.render('index', {title: 'Express'});
});

module.exports = router;
