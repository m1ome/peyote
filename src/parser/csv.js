'use strict';

const parser = require('csv-parse/lib/sync');

module.exports = {
	verify: function (data) {
		try {
			const records = parser(data);
			if (records.length > 0) {
				return true;
			}
		} catch (e) {
			return false;
		}
	},

	prettyprint: function (data, printer) {
		const strpad = '  ';
		/* eslint-disable camelcase */
		const records = parser(data, {
			auto_parse: true,
			columns: true
		});

		let lines = [];
		if (records.length > 0) {
			records.forEach(function (item) {
				lines.push(printer.bracers('['));

				for (let key in item) {
					if (item.hasOwnProperty(key)) {
						const val = item[key];
						let line = '';

						line += printer.dark(strpad + key + ': ');

						switch (typeof val) {
							case 'string':
								if (val.length > 0) {
									if (val === 'true' || val === 'false') {
										line += printer.boolean((val === 'true' ? 'true' : 'false'));
									} else {
										line += printer.string('"' + val + '"');
									}
								} else {
									line += printer.null('null');
								}
								lines.push(line);
								break;
							case 'number':
								line += printer.number(val);
								lines.push(line);
								break;
							default:
						}
					}
				}

				lines.push(printer.bracers(']'));
			});
		}

		return lines;
	}
};
