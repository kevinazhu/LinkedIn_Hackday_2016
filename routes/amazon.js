var express = require('express');
var router = express.Router();

var amazon = require('amazon-product-api');

/* GET home page. */
router.post('/', function(req, res, next) {
	var array = [];
	for(var i = 0; i < 4; i++) {
		if(req.body["data" + i] != undefined) {
			array.push(req.body["data" + i]);
		}
	}
	if(array.length == 0) {
		res.send("ERROR");
	}

	var data = combinations(array);
	if(data.length == 0) {
		data = array;
	}

	amazonClient = amazon.createClient({
		awsId: "AKIAJ2QRGNUKTH4WJRLQ",
		awsSecret: "***REMOVED***"
	});

	var items = [];
	var i = 0;
	searchItem(data, i, items, res, 0);
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

var searchItem = function(data, i, items, res, skip) {
	var num = i;
	if(i >= data.length) {
		skip++;
		num = Math.floor(data.length * Math.random());
	}
	amazonClient.itemSearch({
		keywords: data[num],
		responseGroup: "ItemAttributes, Offers, Images"
	}, function(err, results, response) {
		if (err) {
			console.log(err);
		} else {
			var j = skip;
			while(j < results.length) {
				try {
					var url = results[j]["DetailPageURL"][0];
					var image = results[j]["LargeImage"][0]["URL"][0];
				} catch(e) {
					j++;
					skip++;
					continue;
				}
				break;
			}
			try {
				var price = results[j]["OfferSummary"][0]["LowestNewPrice"][0]["FormattedPrice"][0];
			} catch(e) {
				var price = "Go To Link"
			}
			var item = { url: url, image: image, price: price };
			items.push(item);
		}
		if(items.length == 6) {
			res.send(JSON.stringify(items));
		} else {
			searchItem(data, i + 1, items, res, skip);
		}
	});
}

module.exports = router;
