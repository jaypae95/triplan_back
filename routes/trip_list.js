const express = require('express');
const router = express.Router();
const db = require('./db');
/* GET home page. */
router.get('/', function (req, res, next) {

});
router.get('/continent/:name',function(req,res){
    db.connection.query("SELECT * FROM triplan.Country WHERE continent_name=?",req.params.name, function (err, r, fields) {
        res.send(r);
    });

});
router.get('/country/:id',function(req,res){
    db.connection.query("SELECT * FROM triplan.City WHERE country_id=?",req.params.id, function(err,r){
        res.send(r);
    });
});
router.get('/city/:id',function(req,res){
    db.connection.query("SELECT idPlace,place_name,place_img FROM triplan.Place WHERE city_id=?",req.params.id,function(err,r){
        res.send(r);
    });
});
router.get('/place/:id',function(req,res){
    db.connection.query("SELECT place_name,place_img,place_rating,place_explanation,place_lat,place_long FROM triplan.Place WHERE idPlace=?",req.params.id,function(err,r){
        res.send(r);
    });
});
module.exports = router;
