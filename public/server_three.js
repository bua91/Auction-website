const express = require('express')
const app = express()
const mysql = require('mysql')
const bodyParser = require('body-parser')
const http = require('http');


app.use(express.static('public'))
app.listen(8000, () => console.log('App listening on port 3000'))
app.get('/', (req, res) => res.redirect('/user_registration.html'))

var router = express.Router();
router.get('/', function(req, res) {
    res.json({ message: 'welcome to our api' });   
});


router.route('/register')
  .post(function(req, res){
	  res.json({ message: 'welcome to our api' });   
  })
  
  router.route('/register')
  .get(function(req, res){
	  res.json({ message: 'welcome to our api' });   
  })