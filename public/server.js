const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 8080


const mysql = require('mysql')
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '12345',
  database : 'auction'
});

//app.use(bodyParser.urlencoded({ extended: true }))
//app.use(bodyParser.json())


connection.connect();


	if (err)  throw error ;
	console.log('connected');
	var express = require('express');
	var bodyParser = require('body-parser');
	var app = express();
 
	app.use(bodyParser.urlencoded({extended: true}));
	app.post('/', function(req,res){
	var username = req.body.username;
	var pass = req.body.pass;
	var security = req.body.security;
	var email = req.body.email;
	console.log(username);
	var phone = req.body.phone;
	
	var input = "INSERT INTO userdata (username, password, security,email,phone) VALUES(username, pass, security, email, phone)";
	connection.query(sql,function(err,result){
		if (err) throw err;
		console.log('record inserted');
	
	});


app.listen(8080, function(){
	console.log('server running at http://127.0.0.1:8080/');
});







/*app.get('/', (req,res) => handleReq(req,res))

var handleReq = function (req, res){
  var userID = req.param('id')
  connection.query('SELECT * from temp where id='+userID, function (err, rows, fields) {
    if (err) throw err
  
    res.json(rows);
  })
}


var data;





//connection.end()



app.listen(port, () => console.log(`Example app listening on port ${port}!`))*/


