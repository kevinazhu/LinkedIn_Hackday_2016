var express = require('express');
var router = express.Router();

var amazon = require('amazon-product-api');

/* GET home page. */
router.get('/', function(req, res, next) {
	var client = amazon.createClient({
		awsId: "AKIAJ2QRGNUKTH4WJRLQ",
		awsSecret: "***REMOVED***"
	});
	client.itemSearch({
		keywords: 'headphones'
	}, function(err, results, response) {
		if (err) {
			res.send(err)
		} else {
			console.log(response); // response (containing TotalPages, TotalResults, MoreSearchResultsUrl and so on)
			res.send(results);
		}
	});
});

module.exports = router;