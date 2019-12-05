const express = require('express');
const router = express.Router();
const db = require('./db');
/* GET home page. */
router.get('/', function (req, res, next) {

});
router.post('/makeplan',function(req,res){
    var idplan;
    db.connection.query("INSERT INTO triplan.Plan (userinfo_id,depart_day,arrive_day,title,country_id,tour_type,season) VALUES (?,?,?,?,?,?,?)",[req.body.userinfo_id,req.body.depart_day,req.body.arrive_day,req.body.tit,req.body.country_id,req.body.tour_type,req.body.season],function(err,r){
      if(r) {
          console.log("insert complete")

          db.connection.query("SELECT idPlan FROM triplan.Plan WHERE userinfo_id=? AND depart_day=? AND arrive_day=? AND title=? AND country_id=? AND tour_type=? AND season=?", [req.body.userinfo_id, req.body.depart_day, req.body.arrive_day, req.body.tit, req.body.country_id, req.body.tour_type, req.body.season], function (err, r) {
              idplan=r[0].idPlan;
          })
      }
        db.connection.query("SELECT country_lat,country_long FROM triplan.Country WHERE idCountry=?",req.body.country_id, function(err,r){
            res.send({idplan:idplan,country_lat:r[0].country_lat,country_long:r[0].country_long});
        });
    })


});
// router.post('/completeplan',function(req,res){
//     const query1="INSERT INTO triplan.DayPlan (plan_id,city_id) VALUES (?,?)"
//     const query2="INSERT INTO triplan.PlacePlan (dayplan_id,place_id) VALUES (?,?)"
//     const query3="SELECT dayplan_id FROM triplan.DayPlan WHERE plan_id=? AND city_id=?"
//     for(var i=0;i<req.body.dayplan.length;i++) {
//         db.connection.query(query1, [req.body.idPlan, req.body.dayplan[i].city_id]);
//         var dayplanid;
//         db.connection.query(query3, [req.body.idPlan,req.body.dayplan[i].city_id], function (err, r) {
//             dayplanid=r;
//         });
//         for(var j=0;j<req.body.dqyplan[i].place_id.length;j++){
//             db.connection.query(query2, [dqyplanid, req.body.dayplan[i].place_id[j]]);
//         }
//     }
// });
module.exports = router;

