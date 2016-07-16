var express = require('express');
var router = express.Router();
var url = require('url');

var username = "";
var myHostname = "";
var amazonData;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/username', function(req, res, next) {
	names = {"username": username, "myHostname": myHostname};
  res.send(names);
})

router.post('/loading', function(req, res, next) {
  
  var myUrl = req.body.link;
  myHostname = url.parse(myUrl).hostname;
  //
  if(myHostname == "www.linkedin.com"){
    username = url.parse(myUrl).pathname.replace('/in/', '').replace('/','');
  }else {
    //if (myHostname == "www.pinterest.com"){
    username = url.parse(myUrl).pathname.replace('/','').replace('/','');
  } /*else if(myHostname == "www.facebook.com"){

  }*/
  console.log("Host name is: " + myHostname + " and User name is: " + username);
  res.render('loading');

  // parce the link and check if the link is valid

  // if Pinterest or Facebook,
  // parse words from Pinterest or Facebook
  // launch Amazon action
  // when it's done, Amazon action should launch /landing page and set
  // HTML elements with photo, link to the product, and name of the product

  // if LinkedIn, launch hard-coded Amazon action with Programming books
  // launch hard-coded Amazon action
  // when it's done, Amazon action should launch /landing page and set
  // HTML elements with photo, link to the product, and name of the product

  // otherwise, throw invalid link action
});

router.post('/landing', function(req, res, next) {
	amazonData = Object.keys(req.body)[0];
	res.sendStatus(200);
})

router.get('/landing', function(req, res, next) {
	res.render("landing");
})

router.get('/return', function(req, res, next){
  res.render("index");
})

router.get('/amazonData', function(req, res, next) {
	res.send(amazonData);
})

module.exports = router;
