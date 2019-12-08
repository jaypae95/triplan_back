const express = require('express');
const router = express.Router();
const db = require('./db');
const auth = require('./authenticate')
/* GET home page. */
router.get('/', function (req, res, next) {

});
router.post('/makeplan',function(req,res){
    console.log(req.body.title)
    if(req.body.depart_day === '' || req.body.arrive_day === '' || req.body.title === '' || req.body.country_id  === ''|| req.body.tour_type === '' || req.body.season === '') {
        return res.status(400).send('Bad Request')
    }
    const result = auth.getUser(req, res)
    if(result.detail === 'no header') {
        return res.send(500)
    }
    if(result.detail === 'unauthorized') {
        return res.send(401)
    }
    if(result.detail !== 'success') {
        return res.send(500)
    }
    const user = result.user
    let idplan;
    db.connection.query("INSERT INTO triplan.Plan (userinfo_id,depart_day,arrive_day,title,country_id,tour_type,season) VALUES (?,?,?,?,?,?,?)",[user.idUserInfo,req.body.depart_day,req.body.arrive_day,req.body.title, req.body.country_id,req.body.tour_type,req.body.season],function(err,r){
      if(r) {
          console.log("insert complete")

          db.connection.query("SELECT idPlan FROM triplan.Plan WHERE userinfo_id=? AND depart_day=? AND arrive_day=? AND title=? AND country_id=? AND tour_type=? AND season=?", [user.idUserInfo, req.body.depart_day, req.body.arrive_day, req.body.title, req.body.country_id, req.body.tour_type, req.body.season], function (err, r) {
              console.log(r)
              if (r.length === 0) {
                  console.log('no!')
              } else {
                  idplan=r[0].idPlan;
              }
          })
      }
        db.connection.query("SELECT country_lat,country_long FROM triplan.Country WHERE idCountry=?",req.body.country_id, function(err,r){
            res.send({idPlan:idplan,country_lat:r[0].country_lat,country_long:r[0].country_long});
        });
    })


});
router.post('/completeplan',function(req,res){
    const query1="INSERT INTO triplan.DayPlan (plan_id,city_id) VALUES (?,?)"
    const query2="INSERT INTO triplan.PlacePlan (dayplan_id,place_id) VALUES (?,?)"
    const query3="UPDATE triplan.Plan SET has_dayplan=1 WHERE idPlan=?"
    db.connection.query(query3,req.body.idplan)
    for(let i=0;i<req.body.dayplan.length;i++) {
        db.connection.query(query1,[req.body.idPlan, req.body.dayplan[i].city_id],function(err,r){
            console.log(r.insertId)
            for(let j=0;j<req.body.dayplan[i].place_id.length;j++){
                db.connection.query(query2, [r.insertId, req.body.dayplan[i].place_id[j]]);
            }

        });


    }
});
module.exports = router;

