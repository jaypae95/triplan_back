const express = require('express');
const router = express.Router();
const db = require('./db');
/* GET home page. */
router.get('/', function (req, res, next) {
    db.connection.query("SELECT ")
});

module.exports = router;

