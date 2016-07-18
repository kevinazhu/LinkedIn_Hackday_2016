if(hostname.includes('pinterest.com')) {
	$.post('/pinterest', { "username": username }, function(words, status) {
        if(checkWords(words)){
            post("/landing", words);
        } else {
            window.location.href = "/#error";
        }
	})
} else if(hostname.includes('twitter.com')) {
	$.post('/twitter', { "username": username }, function(words, status) {
        if(checkWords(words)){
            post("/landing", words);
        } else {
            window.location.href = "/#error";
        }
	})
} else if(hostname.includes('linkedin.com')) {
	words = ["book", "software", "code", "data"];
	post("/landing", words);
} else {
	window.location.href = "/#error";
}

function checkWords(words) {
    if(words.length == 0) {
        return false;
    }
    return true;
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