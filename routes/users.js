const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const db = require('./db');

require('dotenv').config();


function jwtSignUser (user) {
  const ONE_WEEK = 60 * 60 * 24 * 7;
  return jwt.sign({data: user}, process.env.JWT_SECRET, {
    expiresIn: ONE_WEEK
  })
}
/* GET users listing. */
router.post('/', function(req, res, next) {

});
router.post('/login', function(req, res, next) {
  console.log(req.body)
  db.connection.query("SELECT * FROM triplan.UserInfo WHERE user_id=? and user_password=?",[req.body.user_id, req.body.user_password], function(err,r){
    if (r) {
      const user = r[0]
      console.log(user)
      res.send({
        token: jwtSignUser(user)
      });
    } else {
      res.send('ID or Password is wrong !')
    }
    });
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
