const express = require('express')
const app = express()
const mysql = require('mysql')
const bodyParser = require('body-parser')
var http = require('http');
var moment = require('moment');
var sessionid = 0;

app.use(express.static('public'))
app.listen(3000, () => console.log('App listening on port 3000'))
app.get('/', (req, res) => res.redirect('/post.html'))

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'auction'
})

connection.connect()

var router = express.Router();
router.get('/', function (req, res) {
    res.json({ message: 'welcome to our api' });
	/*if (sessionid != 1){
		res.redirect(/logincheck/index.html);
	}*/
});

//to handle user registration
router.route('/register')
    .get(function (req, res) {
        console.log("GET request: /register " + JSON.stringify(req.query));
        var data = { afd: "asdfs" }
        res.json({ message: 'getgetget' })
    });


router.route('/register')
    .post(function (req, res) {
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


        var input = "INSERT INTO userdata (username,password,security,email,phone)\nVALUES(\"" + username + "\",\"" + ps + "\",\"" + security + "\",\"" + email + "\"," + phone + ");"
        console.log(input)
        console.log("effffffffffffffffffffffffffffffff")


        /*var options = {
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
        */


        connection.query(input, function (err, result, fields) {
            if (err) throw err;
            res.json(result);
        })






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




router.route('/item')
    .post(function (req, res) {
        console.log("POST request: /item " + JSON.stringify(req.body));


        var itemName = req.body.itemName;
        var itemDescription = req.body.itemDescription;
        var minimumPrice = req.body.minimumPrice;

        var auctionDate = req.body.auctionDate;
        var auctionTime = req.body.auctionTime;
        var imageUpload = req.body.imageUpload;
        if (!imageUpload)
            imageUpload = "NULL"

		var temp = "SELECT availibility FROM admin_table WHERE date = \"" +auctionDate+ "\" AND start_time = \""+ auctionTime + "\";"
		connection.query(temp, function (err, result, fields) {
			if (err) throw err;
			console.log(result.length);
			if(result.length != 1){
				res.json(result);
			}
        });
		
        var input = "INSERT INTO items (item, description, min_price,  date, time,image)\nVALUES(\"" + itemName + "\",\"" + itemDescription + "\",\"" + minimumPrice + "\",\"" + auctionDate + "\",\"" + auctionTime + "\"," + imageUpload + ");"


        connection.query(input, function (err, result, fields) {
            if (err) throw err;
            res.json(result);
        })
    });


router.route('/getitem')
    .get(function (req, res) {
        //console.log("I am here =============");
        var input = "SELECT * FROM items;"
        connection.query(input, function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            res.json(result);
        })
    });


router.route('/logout')
    .get(function (req, res) {
        console.log("logout backend");
        sessionid = 0;
        var input = 'logged-out';
        connection.query(input, function (err, result, fields) {
            if (err) throw err;
            res.json(result);
        })
    });

router.route('/submission')
    .post(function (req, res) {
        console.log("POST request: /submission " + JSON.stringify(req.body));


        var userID = req.body.userID;
        var text1 = req.body.text1;
        console.log(text1);
        var MinimumPrice = req.body.MinimumPrice;
        console.log(MinimumPrice)

        var auctiondate = req.body.auctiondate;
        var auctiontime = req.body.auctiontime;
        var imageUpload = req.body.imageUpload;


        var input = "INSERT INTO bid (user_id, item_id,bid_price)\nVALUES(\"" + itemname + "\",\"" + text1 + "\",\"" + MinimumPrice + "\",\"" + auctiondate + "\"," + auctiontime + "\"," + imageUpload + ");"
        console.log(input)
        console.log("effffffffffffffffffffffffffffffff")

        connection.query(input, function (err, result, fields) {
            if (err) throw err;
            res.json(result);
        })



    });

router.route('/specifyAuction')
    .get(function (req, res) {
        console.log("GET request: /specifyAuction " + JSON.stringify(req.query));
        var data = { afd: "asdfs" }
        res.json({ message: 'specify auction' })
    });

router.route('/specifyAuction')
    .post(function (req, res) {
        console.log("POST request: /specifyAuction " + JSON.stringify(req.body));

        var date = req.body.date;
        var stime = req.body.stime;
        var etime = req.body.etime;
        
        var abid = req.body.abid;
        maxItems = parseInt(abid);
        console.log("dsfdwfdfdf");
        console.log(typeof(date));
        var startTime=moment(stime, "HH:mm:ss a");
        var endTime=moment(etime, "HH:mm:ss a");
        var duration = moment.duration(endTime.diff(startTime));
       
       
        var minutes = parseInt(duration.asMinutes());
         //string
        
        var slot_duration = minutes/maxItems ;

        var i;
        
        var availibility =  1 ;
        var input; 
        //var dateFormat = 'HH:mm';
        //var resultDate = moment(stime).add('minutes', slot_duration).format(dateFormat);
        //console.log(resultDate)

        var hours ;
        var minutes; 
        var slot_end_time ;
        
        
        for (i = 0; i < maxItems; i++)
         { 
             
            hours = stime.split(':')[0];
            minutes =stime.split(':')[1];
            var time = moment(hours+':'+minutes,'HH:mm');
            time.add(slot_duration,'m');
            console.log("fefdaDFAFFA")
            slot_end_time = time.format("HH:mm");

            console.log("ssssssssssssssssssssssssssssss")
            console.log(stime);
            console.log(slot_end_time)


             input = "INSERT INTO admin_table (date, start_time, end_time,availibility) \nVALUES(\""+date+"\",\""+stime+"\",\""+slot_end_time+"\","+availibility+");"
             stime  = slot_end_time;
             
     
             connection.query(input, function (err, result, fields) {
                 if (err) throw err;
                 //res.json(result);
             })
             
        } 
        
	});


router.route('/bidpostroute')
    .get(function (req, res) {
        console.log("GET request: /bidpostroute " + JSON.stringify(req.query));
        var data = { afd: "asdfs" }
        res.json({ message: 'Bid post backend' })
    });

router.route('/bidpostroute')
    .post(function (req, res) {
        console.log("POST request: /bidpostroute " + JSON.stringify(req.body));

        var itemid = req.body.itmid;
        var bidprice = req.body.bdprc;
        //var date = Date();
        var systime = new Date().toLocaleTimeString();
        //console.log(systime);

        var input = "SELECT time FROM items WHERE id = \"" +itemid+ "\" AND time >= \""+ systime + "\";"
        console.log(input)
        console.log("biiiiiiiiiiiiiiiidddddddddddddddddd")

        connection.query(input, function (err, result, fields) {
            if (err) throw err;
            
            console.log(result.length);
            res.json(result);
        })
    });


router.route('/logincheck')
    .get(function (req, res) {
        console.log("GET request: /logincheck " + JSON.stringify(req.query));
        var data = { afd: "asdfs" }
        res.json({ message: 'login check' })
    });

router.route('/logincheck')
    .post(function (req, res) {
        console.log("POST request: /logincheck " + JSON.stringify(req.body));
        console.log("==============================================");
        var username = req.body.username;
        var password = req.body.password;
        console.log(username);
        
        var input = "SELECT * FROM userdata WHERE username = \"" +username+ "\" AND password = \""+ password + "\";"
        console.log(input)
        console.log("loginnnnnnnnnnnnnnnn");
        

        connection.query(input, function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            console.log(result.length);
            if (result.length == 1){
                sessionid = 1;
            }
            else{
                sessionid = 0;
            }
            res.json(result);
        })
    });

//connection.end()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('', router);

