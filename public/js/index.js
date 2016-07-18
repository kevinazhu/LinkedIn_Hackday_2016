$(document).ready(function() {
	if(location.hash == "#error") {
		$('#errorMessage').html("Sorry, we could not find user specified or there were not enough results.");
	}

	$("#gift-pic").click(function() {
	    $('html, body').animate({
	        scrollTop: $("#find-gift").offset().top
	    }, 1000, "swing", function() {
	    	window.location.href = "/#find-gift";
	    });
	});
});

function validateInput() {
	var url = document.forms["findForm"]["link"].value;
	if(!url.startsWith("http")) {
		url = "http://" + url;
	}

 	var username = "";
	var hostname = parseURL(url).hostname;
	if(hostname != null) {
		if(hostname.includes("linkedin.com")) {
			$('#errorMessage').html("Sorry, LinkedIn's API is restricted so this isn't supported yet.");
			return false;
			//username = parseURL(url).pathname.replace('/in/', '').replace('/','');
		} else if (hostname.includes("pinterest.com")) {
			username = parseURL(url).pathname.replace('/','').replace('/','');
			$('#username').val(username);
		} else if(hostname.includes("twitter.com")) {
			username = parseURL(url).pathname.replace('/','').replace('/','');
			$('#username').val(username);
		} else {
			$('#errorMessage').html("Please enter a supported URL.");
			return false;
		}
	}

	if(username != "") {
		$('#hostname').val(hostname);
		return true;
	}

	$('#errorMessage').html("Please include username within URL.");
	return false;
}

function parseURL(url) {
    var parser = document.createElement('a'),
        searchObject = {},
        queries, split, i;
    // Let the browser do the work
    parser.href = url;
    // Convert query string to object
    queries = parser.search.replace(/^\?/, '').split('&');
    for( i = 0; i < queries.length; i++ ) {
        split = queries[i].split('=');
        searchObject[split[0]] = split[1];
    }
    return {
        protocol: parser.protocol,
        host: parser.host,
        hostname: parser.hostname,
        port: parser.port,
        pathname: parser.pathname,
        search: parser.search,
        searchObject: searchObject,
        hash: parser.hash
    };
}
