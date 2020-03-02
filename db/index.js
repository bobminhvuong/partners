var mysql = require('mysql');
var con = mysql.createConnection({
  host     : 'remotemysql.com',
  user     : 'Z0DVIGrbfi',
  password : 'fTdyApBJww',
  database : 'Z0DVIGrbfi'
});
con.connect(function(err,res){
  if(err){
    console.log(err);
  }else{ console.log('connect to db');
  }
});
module.exports = con;
