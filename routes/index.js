var express = require('express');
var router = express.Router();
var url = require('url');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/loading', function(req, res, next) {
  
  var myUrl = req.body.link;
  var myHostname = url.parse(myUrl).hostname;
  var myPathname = url.parse(myUrl).pathname.replace('/','').replace('/','');
  /*if (myHostname == "www.pinterest.com"){

  }else if(myHostname == "www.linkedin.com"){

  }else if(myHostname == "www.facebook.com"){

  }*/
  console.log("Host name is: " + myHostname + " and User name is: " + myPathname);
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

module.exports = router;
