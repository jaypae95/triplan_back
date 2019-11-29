const express = require('express');
const router = express.Router();
const db = require('./db');

/* GET users listing. */
router.post('/', function(req, res, next) {

});
router.post('/login', function(req, res, next) {

});
router.post('/signup', function(req, res, next) {
    db.connection.query("INSERT INTO triplan.UserInfo (user_id,user_name,user_gender,user_phone,user_email,user_password) VALUES (?,?,?,?,?,?)",[req.body.user_id,req.body.user_name,req.body.user_gender,req.body.user_phone,req.body.user_email,req.body.user_password], function (err, r, fields) {
        if(r){
          res.json({success:true});
        }else{
          res.json({success:false})
        }
    });
});

module.exports = router;
