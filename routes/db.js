const mysql = require('mysql');
require('dotenv').config();

const option = {
  host:     process.env.RDS_HOSTNAME,
  user:     process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  port:     process.env.RDS_PORT
}

const connection = mysql.createConnection(option);

connection.connect(function (err) {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('connected');
});

module.exports = {'connection': connection, 'option': option};
