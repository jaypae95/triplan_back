const express = require('express');
const router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
  console.log(req.body)
  res.send(req.body)
});


module.exports = router;
