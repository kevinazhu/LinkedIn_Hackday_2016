$.get('/amazonData', function(data, status) {
	var newdata = JSON.parse(data);
	for(var i = 0; i < newdata.length; i++) {
		document.getElementById("a" + i).href = newdata[i].url;
		document.getElementById("i" + i).src = newdata[i].image;
	}

	while(i < 6) {
		document.getElementById("a" + i).style.visibility = "hidden";
		i++;
	}
})