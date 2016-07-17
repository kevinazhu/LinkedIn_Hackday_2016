var express = require('express');
var router = express.Router();

var amazon = require('amazon-product-api');

/* GET home page. */
router.get('/', function(req, res, next) {
	var array = [req.query.data0, req.query.data1, req.query.data2, req.query.data3];
	var data = combinations(array);

	amazonClient = amazon.createClient({
		awsId: "AKIAJ2QRGNUKTH4WJRLQ",
		awsSecret: "***REMOVED***"
	});

	var i = 0;
	var items = [];
	for(var i = 0; i < data.length; i++) {
		searchItem(data, i, items, res);
	}
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

var count = 0;
var searchItem = function(data, i, items, res) {
	amazonClient.itemSearch({
		keywords: data[i],
		responseGroup: "ItemAttributes, Offers, Images"
	}, function(err, results, response) {
		if (err) {
			console.log(err)
		} else {
			//for(var num = 0; num < results.length; num++) {
				var url = results[0]["DetailPageURL"][0];
				var image = results[0]["LargeImage"][0]["URL"][0];
				try {
					var price = results[0]["OfferSummary"][0]["LowestNewPrice"][0]["FormattedPrice"][0];
				} catch(e) {
					var price = "Go To Link"
				}
				var item = { url: url, image: image, price: price };
				items.push(item);
			//}
		}
		count++;
		if(count == data.length) {
			res.send(JSON.stringify(items));
			count = 0
		}
	});
}

module.exports = router;