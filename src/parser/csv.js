'use strict';

const parser = require('csv-parse/lib/sync');
const chalk = require('chalk');

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

	prettyprint: function (data) {
		const strpad = '  ';
		/* eslint-disable camelcase */
		const records = parser(data, {
			auto_parse: true,
			columns: true
		});

		let lines = [];
		if (records.length > 0) {
			records.forEach(function (item) {
				lines.push(chalk.magenta('['));

				for (let key in item) {
					if (item.hasOwnProperty(key)) {
						const val = item[key];
						let line = '';

						line += chalk.black(strpad + key + ': ');

						switch (typeof val) {
							case 'string':
								if (val.length > 0) {
									if (val === 'true' || val === 'false') {
										line += chalk.green((val === 'true' ? 'true' : 'false'));
									} else {
										line += chalk.blue('"' + val + '"');
									}
								} else {
									line += chalk.gray('null');
								}
								lines.push(line);
								break;
							case 'number':
								line += chalk.red(val);
								lines.push(line);
								break;
							default:
						}
					}
				}

				lines.push(chalk.magenta(']'));
			});
		}

		return lines;
	}
};
