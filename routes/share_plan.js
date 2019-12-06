const express = require('express');
const router = express.Router();
const db = require('./db');
/* GET home page. */
router.get('/', function (req, res, next) {
    const query="SELECT idPlan,date_format(depart_day,'%Y-%m-%d') as depart_day,date_format(arrive_day, '%Y-%m-%d') as arrive_day,title,c.country_name FROM triplan.Plan AS p INNER JOIN triplan.Country AS c ON p.country_id=c.idCountry "
    db.connection.query(query,function(err,r){
        res.send(r)
    });
});
router.post('/',function(req,res){
    const query="SELECT idPlan,date_format(depart_day, '%Y-%m-%d') as depart_day,date_format(arrive_day, '%Y-%m-%d') as arrive_day,title,c.country_name FROM triplan.Plan AS p INNER JOIN triplan.Country AS c ON p.country_id=c.idCountry WHERE tour_type=? AND season=?"
    db.connection.query(query,[req.body.tour_type,req.body.season],function(err,r){
        res.send(r)
    });
});

router.post('/toggleshare', function(req, res) {
    const idPlan = req.body.idPlan
    console.log(idPlan)
    const query = "UPDATE triplan.Plan SET is_shared=CASE \n" +
      "WHEN is_shared=0 THEN 1\n" +
      "WHEN is_shared=1 THEN 0\n" +
      "END\n" +
      "WHERE idPlan=?"
    db.connection.query(query, idPlan, function(err, r){
        res.send(r)
    })
})
module.exports = router;

