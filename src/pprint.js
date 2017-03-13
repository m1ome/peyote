'use strict';

module.exports = function (data, printer) {
	const parsers = [
		require('./parser/json'),
		require('./parser/csv')
	];
	let output = null;

	parsers.forEach(function (parser) {
		if (parser.verify(data)) {
			output = parser.prettyprint(data, printer);
			return;
		}
	});

	return output;
};
