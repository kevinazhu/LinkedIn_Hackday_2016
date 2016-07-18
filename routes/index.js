var express = require('express');
var router = express.Router();
var url = require('url');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index');
});

router.post('/loading', function(req, res, next) {

 	var username = req.body.username;
	var hostname = req.body.hostname;

	res.render('loading', { "username": username, "hostname": hostname });
});

router.post('/landing', function(req, res, next) {
	var words = req.body;
	res.render('landing', { "words": words });
})

module.exports = router;
