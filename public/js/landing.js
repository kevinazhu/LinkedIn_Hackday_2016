$.get('/amazonData', function(data, status) {
	console.log(data);
	var newdata = JSON.parse(data);
	console.log(newdata);
	document.getElementById("a0").href = newdata[0].url;
	document.getElementById("i0").src = newdata[0].image;
	document.getElementById("a1").href = newdata[1].url;
	document.getElementById("i1").src = newdata[1].image;
	document.getElementById("a2").href = newdata[2].url;
	document.getElementById("i2").src = newdata[2].image;
	document.getElementById("a3").href = newdata[3].url;
	document.getElementById("i3").src = newdata[3].image;
	document.getElementById("a4").href = newdata[4].url;
	document.getElementById("i4").src = newdata[4].image;
	document.getElementById("a5").href = newdata[5].url;
	document.getElementById("i5").src = newdata[5].image;
})