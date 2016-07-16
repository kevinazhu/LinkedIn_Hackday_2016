var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/loading', function(req, res, next) {
  res.render('loading');
  console.log(req.body.link);

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
