const express = require('express')
const app = express()
const mysql = require('mysql')
const bodyParser = require('body-parser')
var http = require('http');




app.use(express.static('public'))
app.listen(3000, () => console.log('App listening on port 3000'))
app.get('/', (req, res) => res.redirect('/user_registration.html'))

/*var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '12345',
  database : 'auction'
})

connection.connect()*/

var router = express.Router();
router.get('/', function(req, res) {
    res.json({ message: 'welcome to our api' });   
});

//to search books
router.route('/register')
  .get(function(req, res) {
    console.log("GET request: /register " + JSON.stringify(req.query));
	var data = {afd:"asdfs"}
	res.json({ message: 'getgetget' })
  });

// to borrow a book
router.route('/register')
  .post(function(req, res){
    console.log("POST request: /register " + JSON.stringify(req.body));
	var username = req.body.username;
	console.log(username)
	
	var ps = req.body.pswd;
	var security = req.body.security;
	console.log("dddddddddddddddddddd");
	console.log(ps); 
	var email = req.body.email;
	console.log(email)

	var phone = req.body.phone;
	
	
	var input = "INSERT INTO userdata (username,password,security,email,phone)\nVALUES(\""+username+"\",\""+ps+"\",\""+security+"\",\""+email+"\","+phone+");"
	console.log(input)
	console.log("effffffffffffffffffffffffffffffff")
	
	
	var options = {
    host: "localhost",
	port:8000,
    path: "/register",
    method: "POST",
    headers: {
        "Content-Type": "application/json"
        //"Authorization": "Bearer token"
    }
	};

	var req = http.request(options, function (res) {
    var responseString = "";
	console("dddddddddddd")

    res.on("data", function (data) {
        responseString += data;
        // save all the data from response
    });
    res.on("end", function () {
        console.log(responseString); 
        // print to console when response ends
    });
	req.write(input, function(err) { req.end(); });
	
});
	


	/*connection.query(input,function(err,result, fields){
		if (err) throw err;
	res.json(result); })*/
	
	
	/*,function(err,result, fields){
		if (err) throw err;
		res.json(result);
	
	});*/
		
    /*
	var isbn13 = req.body.isbn13;
    var borrowerCardID = req.body.borrowerCardID;
    connection.query("SELECT * FROM BOOK_LOANS WHERE CARD_ID="+borrowerCardID+" AND DATE_IN IS NULL",function(err, rows, fields){
      if (err) {
        res.status(500).json({ "msg": "Error : Invalid CARD_ID" });
        return false;
      }
      if (rows.length == 3){
        res.status(500).json({ "msg": "Error : Cannot borrow more than 3 books" });
      } else {
        connection.query("INSERT INTO BOOK_LOANS (ISBN13, CARD_ID, DATE_OUT, DUE_DATE) VALUES ('"+isbn13+"',"+borrowerCardID+",curdate(), curdate()+14);", function (err, rows, fields) {
          if (err) {
            res.status(500).json({ "msg": "Error : Invalid Input\n"+err});
            return false;
          }
          connection.query("UPDATE BOOK SET Unavailable=1 WHERE ISBN13='"+isbn13+"';");
          res.json({"msg":"Success"});
        })
      }
    });*/
  });



//connection.end()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('', router);

