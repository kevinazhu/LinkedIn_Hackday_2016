var express = require('express');
var router = express.Router();
var url = require('url');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/loading', function(req, res, next) {

  var myUrl = req.body.link;
  var username = "";
  var myHostname = url.parse(myUrl).hostname;
  
  if(myHostname.includes("linkedin.com")) {
    username = url.parse(myUrl).pathname.replace('/in/', '').replace('/','');
  } else if (myHostname.includes("pinterest.com")) {
    username = url.parse(myUrl).pathname.replace('/','').replace('/','');
  } else if(myHostname.includes("twitter.com")) {
  	username = url.parse(myUrl).pathname.replace('/','').replace('/','');
  }
  res.render('loading', { "username": username, "myHostname": myHostname });
});

router.post('/landing', function(req, res, next) {
	var words = req.body;
	console.log(words);
	res.render('landing', { "words": words });
})

module.exports = router;
