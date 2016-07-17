if(myHostname.includes('pinterest.com')) {
	$.get('/pinterest/' + username, function(words, status) {
		post("/landing", words);
	})
} else if(myHostname.includes('twitter.com')) {
	$.get('/twitter/' + username, function(words, status) {
		post("/landing", words);
	})
} else if(myHostname.includes('linkedin.com')) {
	words = ["book", "software", "code", "data"];
	post("/landing", words);
} else {
	window.location.href = "/";
}

function post(path, params) {
    var form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.setAttribute("action", path);

    for(var i = 0; i < params.length; i++) {
        var hiddenField = document.createElement("input");
        hiddenField.setAttribute("type", "hidden");
        hiddenField.setAttribute("name", "data" + i);
        hiddenField.setAttribute("value", params[i]);

        form.appendChild(hiddenField);
    }

    document.body.appendChild(form);
    form.submit();
}