var express = require('express');
var router = express.Router();

var amazon = require('amazon-product-api');

/* GET home page. */
router.get('/', function(req, res, next) {
	var array = ["bento", "diy", "love", "chocolate"];
	var data = combinations(array);

	amazonClient = amazon.createClient({
		awsId: "AKIAJ2QRGNUKTH4WJRLQ",
		awsSecret: "***REMOVED***"
	});

	var i = 0;
	var items = []
	searchItem(data, i, items, res);
});

var combinations = function(array) {
	combination_data = []
	for(var i = 0; i < array.length; i++) {
		for(var j = i + 1; j < array.length; j++) {
			combination_data.push(array[i] + " " + array[j]);
		}
	}
	return combination_data;
}

var searchItem = function(data, i, items, res) {
	if(i < data.length) {
		amazonClient.itemSearch({
			keywords: data[i]
		}, function(err, results, response) {
			if (err) {
				console.log(err)
			} else {
				for(var num = 0; num < results.length; num++) {
					items.push({ url: results[num]["DetailPageURL"][0], name: results[num]["ItemAttributes"][0]["Title"][0] });
				}
				
				searchItem(data, i+1, items, res);
			}
		});
	} else {
		res.send(items);
	}
}

module.exports = router;