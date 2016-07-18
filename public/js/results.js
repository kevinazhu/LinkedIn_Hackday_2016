if(hostname.includes('pinterest.com')) {
	$.post('/pinterest', { "username": username }, function(words, status) {
        if(checkWords(words)){
            getAmazonResults(words);
        } else {
            window.location.href = "/#error";
        }
	})
} else if(hostname.includes('twitter.com')) {
	$.post('/twitter', { "username": username }, function(words, status) {
        if(checkWords(words)){
            getAmazonResults(words);
        } else {
            window.location.href = "/#error";
        }
	})
} else if(hostname.includes('linkedin.com')) {
	words = ["book", "software", "code", "data"];
    getAmazonResults(words);
} else {
	window.location.href = "/#error";
}

function checkWords(words) {
    if(words.length == 0) {
        return false;
    }
    return true;
}

function getAmazonResults(words) {
	var postData = {};
	for(var i = 0; i < words.length; i++) {
		postData["data" + i] = words[i];
	}
	$.post('/amazon', postData, function(data, status) {
		amazonData = JSON.parse(data);
		renderResults(amazonData);
	})
}

function renderResults(amazonData) {
	var List = function List(props) {
	  return React.createElement(
	    'section',
	    { id: 'portfolio' },
	    React.createElement(
	      'div',
	      { className: 'container' },
	      React.createElement(
	        'div',
	        { className: 'row' },
	        React.createElement(
	          'div',
	          { className: 'col-lg-12 text-center' },
	          React.createElement(
	            'h2',
	            null,
	            'Here are the gifts!'
	          ),
	          React.createElement('hr', { className: 'star-primary' })
	        )
	      ),
	      React.createElement(
	        'div',
	        { className: 'row' },
	        props.data.map(function (item, index) {
	          return React.createElement(
	            'div',
	            { className: 'col-sm-4 portfolio-item' },
	            React.createElement(
	              'a',
	              { id: 'a' + index, href: item.url, className: 'portfolio-link' },
	              React.createElement(
	                'div',
	                { className: 'caption' },
	                React.createElement('div', { className: 'caption-content' })
	              ),
	              React.createElement('img', { id: 'i' + index, src: item.image, className: 'img-responsive-hi', alt: '' })
	            )
	          );
	        })
	      )
	    )
	  );
	};

	ReactDOM.render(React.createElement(List, { data: amazonData }), document.getElementById('target'));
}

