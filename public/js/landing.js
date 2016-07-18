$.post('/amazon', words, function(data, status) {
	amazonData = JSON.parse(data);

	var List = function List(props) {
	  return React.createElement(
	    'div',
	    null,
	    props.data.map(function (item, index) {
	      return React.createElement(
	        'div',
	        { className: 'col-sm-4 portfolio-item' },
	        React.createElement(
	          'a',
	          { id: 'a' + index, href: item.url, className: 'portfolio-link', 'data-toggle': 'modal', target: '_blank' },
	          React.createElement(
	            'div',
	            { className: 'caption' },
	            React.createElement('div', { className: 'caption-content' })
	          ),
	          React.createElement('img', { id: 'i' + index, src: item.image, className: 'img-responsive-hi', alt: '' })
	        )
	      );
	    })
	  );
	};

	ReactDOM.render(React.createElement(List, { data: amazonData }), document.getElementById('target'));
})