var express = require('express');
var router = express.Router();
var url = require('url');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index');
});

/*
router.post('/loading', function(req, res, next) {

 	var username = req.body.username;
	var hostname = req.body.hostname;

	res.render('loading', { "username": username, "hostname": hostname });
});
*/

router.get('/results', function(req, res, next) {
	res.redirect('/');
})

router.post('/results', function(req, res, next) {
	var username = req.body.username;
	var hostname = req.body.hostname;

	res.render('results', { "username": username, "hostname": hostname });
})

module.exports = router;
