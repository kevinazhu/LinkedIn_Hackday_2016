var express = require('express');
var router = express.Router();
var url = require('url');

var username = "";
var amazonData;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/username', function(req, res, next) {
	res.send(username)
})

router.post('/loading', function(req, res, next) {
  
  var myUrl = req.body.link;
  var myHostname = url.parse(myUrl).hostname;
  username = url.parse(myUrl).pathname.replace('/','').replace('/','');
  /*if (myHostname == "www.pinterest.com"){

  }else if(myHostname == "www.linkedin.com"){

  }else if(myHostname == "www.facebook.com"){

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
	amazonData = Object.keys(req.body)[0]
	res.sendStatus(200);
})

router.get('/landing', function(req, res, next) {
	res.render("landing");
})

router.get('/amazonData', function(req, res, next) {
	res.send(amazonData);
})

module.exports = router;
