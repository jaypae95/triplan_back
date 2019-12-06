const express = require('express');
const router = express.Router();
const db = require('./db');
/* GET home page. */
router.get('/:id', function (req, res, next) {
    const query1="SELECT title,date_format(depart_day,'%Y-%m-%d') as depart_day,date_format(arrive_day, '%Y-%m-%d') as arrive_day,tour_type,season,country_name,dayplan_id,city_name\n" +
        "FROM " +
        "triplan.Plan as p " +
        "    INNER JOIN triplan.Country as c " +
        "    INNER JOIN triplan.DayPlan as d " +
        "    INNER JOIN triplan.City as cc " +
        "ON p.country_id=c.idCountry " +
        "    AND d.plan_id=p.idPlan " +
        "    AND cc.idCity=d.city_id " +
        "WHERE idPlan=?"
    const query2="SELECT dp.dayplan_id,place_name,place_img,place_explanation,place_lat,place_long\n" +
        "FROM " +
        "    triplan.PlacePlan as pp " +
        "    INNER JOIN triplan.DayPlan as dp " +
        "    INNER JOIN triplan.Place as p " +
        "    ON pp.dayplan_id=dp.dayplan_id " +
        "    AND p.idPlace=pp.place_id " +
        "WHERE plan_id=?"
    // noinspection JSAnnotator
    let result={};
    db.connection.query(query1,req.params.id,function(err,r){
        result.dayplan = []
        r.forEach(function(element){
            if (!result.title) {
                result.title = element.title
                result.depart_day = element.depart_day
                result.arrive_day = element.arrive_day
                result.tour_type = element.tour_type
                result.season = element.season
                result.country_name = element.country_name
            }
            let dayp = {}
            dayp.dayplan_id = element.dayplan_id
            dayp.city_name = element.city_name
            dayp.place = []
            result.dayplan.push(dayp)
        });
        db.connection.query(query2,req.params.id,function(err,r){
            r.forEach(function(element){
                let ind = result.dayplan.findIndex(function(item,i){
                    return item.dayplan_id === element.dayplan_id
                })
                console.log(ind)
                let place = {}
                place.place_name = element.place_name
                place.place_img = element.place_img
                place.place_explanation = element.place_explanation
                place.place_lat = element.place_lat
                place.place_long = element.place_long
                result.dayplan[ind].place.push(place)
            })
            res.send(result)
        })
    });

});

module.exports = router;

