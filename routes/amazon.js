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

count = 0;
var searchItem = function(data, i, items, res) {
	amazonClient.itemSearch({
		keywords: data[i],
		responseGroup: "ItemAttributes, Offers, Images"
	}, function(err, results, response) {
		if (err) {
			count++;
			console.log(err)
		} else {
			count++;
			//for(var num = 0; num < results.length; num++) {
				var url = results[0]["DetailPageURL"][0];
				var name = results[0]["ItemAttributes"][0]["Title"][0];
				var image = results[0]["LargeImage"][0]["URL"][0];
				try {
					var price = results[0]["OfferSummary"][0]["LowestNewPrice"][0]["FormattedPrice"][0];
				} catch(e) {
					var price = "Go To Link"
				}
				items.push({ url: url, name: name, image: image, price: price });
			//}
		}
		if(count == data.length) {
			res.send(items);
		}
	});
}

module.exports = router;