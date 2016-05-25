'use strict';

module.exports = function (data) {
	const parsers = [
		require('./parser/json')
	];
	let output = null;

	parsers.forEach(function (parser) {
		if (parser.verify(data)) {
			output = parser.prettyprint(data);
			return;
		}
	});

	return output;
};
