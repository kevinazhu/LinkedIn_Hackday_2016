$.get('/username', function(names,status) {
	if(names["myHostname"].includes('pinterest.com')) {
		$.get('/pinterest/' + names["username"], function(word, status) {
			$.get('/amazon?data0=' + word[0] + '&data1=' + word[1] + '&data2=' + word[2] + '&data3=' + word[3], function(data, status) {
				$.post('/landing', data, function(d, status) {
					window.location.href = "/landing";
				})
			})
		})
	} else if(names["myHostname"].includes('linkedin.com')) {
		$.get('/amazon?data0=' + 'book' + '&data1=' + 'software' + '&data2=' + 'code'+ '&data3=' + 'data', function(data, status) {
			$.post('/landing', data, function(d, status) {
				window.location.href = "/landing";
			})
		})
	} else if(names["myHostname"].includes('twitter.com')) {
		$.get('/twitter/' + names["username"], function(word, status) {
			$.get('/amazon?data0=' + word[0] + '&data1=' + word[1] + '&data2=' + word[2] + '&data3=' + word[3], function(data, status) {
				$.post('/landing', data, function(d, status) {
					window.location.href = "/landing";
				})
			})
		})
	} else {
		window.location.href = "/";
	}
	
})