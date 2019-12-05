const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();
const db = require('./db');

require('dotenv').config();


function jwtSignUser(user) {
  const ONE_WEEK = 60 * 60 * 24 * 7;
  return jwt.sign({data: user}, process.env.JWT_SECRET, {
    expiresIn: ONE_WEEK
  })
}

/* GET users listing. */
router.post('/', function (req, res, next) {

});
router.post('/login', function (req, res, next) {
  db.connection.query("SELECT * FROM triplan.UserInfo WHERE user_id=?", req.body.user_id, function (err, r) {
    console.log(r)
    if (r.length > 0) {
      const user = r[0]
      const passwordIsValid = bcrypt.compareSync(req.body.user_password, user.user_password);
      if (passwordIsValid) {
        res.send({
          auth: true,
          token: jwtSignUser(user),
          user: user
        });
      } else {
        res.status(401).send({auth:false, token:null})
      }
    } else {
      console.log('no user')
      res.status(404).send('No user found.')
    }
  });
});
router.post('/signup', function (req, res, next) {
  db.connection.query("INSERT INTO triplan.UserInfo (user_id,user_name,user_gender,user_phone,user_email,user_password) VALUES (?,?,?,?,?,?)",
    [req.body.user_id, req.body.user_name, req.body.user_gender, req.body.user_phone, req.body.user_email, bcrypt.hashSync(req.body.user_password, 8)], function (err, r, fields) {
      
    });
});

router.post('/overlap', function (req, res, next) {
  db.connection.query("SELECT * FROM triplan.UserInfo WHERE user_id=?", req.body.user_id, function (err, r) {
    console.log(r)
    if (r.length>0){
      res.json({is_exist: true})
    }else {
      res.json({is_exist:false})
    }
  });
});
module.exports = router;
