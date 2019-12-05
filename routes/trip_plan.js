const express = require('express');
const router = express.Router();
const db = require('./db');
/* GET home page. */
router.get('/', function (req, res, next) {

});

router.post('/makeplan',function(req,res){
    db.connection.query("SELECT country_lat,country_long FROM triplan.Country WHERE idCountry=?",req.body.country_id, function(err,r){
        res.send(r);
    });
});
router.post('/make_dayplan',function(req,res){

});
module.exports = router;

