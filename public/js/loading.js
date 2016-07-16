$.get('/username', function(username, status) {
	$.get('/pinterest/' + username, function(word, status) {
		$.get('/amazon?data0=' + word[0] + '&data1=' + word[1] + '&data2=' + word[2] + '&data3=' + word[3], function(data, status) {
			$.post('/landing', data, function(d, status) {
				window.location.href = "/landing";
			})
		})
	})
})