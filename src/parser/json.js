'use strict';

function comma(printer, element, value) {
	const keys = Object.keys(element);
	return (keys.indexOf(value) === (keys.length - 1)) ? printer.dark('') : printer.dark(',');
}

function pprintJSON(object, printer, pad, skipKeys) {
	const padding = pad || 0;
	let strpad = '';

	if (padding > 0) {
		for (let i = 0; i < padding * 2; i++) {
			strpad += ' ';
		}
	}

	let line = '';
	let lines = [];

	for (let key in object) {
		if (skipKeys === true) {
			line = strpad;
		} else {
			line = printer.dark(strpad + key + ': ');
		}

		const val = object[key];

		switch (typeof val) {
			case 'string':
				line += printer.string('"' + val + '"' + comma(printer, object, key));
				lines.push(line);
				break;
			case 'number':
				line += printer.number(val + comma(printer, object, key));
				lines.push(line);
				break;
			case 'boolean':
				line += printer.boolean((val ? 'true' : 'false') + comma(printer, object, key));
				lines.push(line);
				break;
			case 'object':
				if (Object.prototype.toString.call(val) === '[object Array]') {
					lines.push(line + printer.bracers('['));
					const l = pprintJSON(val, printer, padding + 1, true);
					l.forEach(function (line) {
						lines.push(line);
					});
					lines.push(strpad + printer.bracers(']') + comma(printer, object, key));
				} else if (Object.prototype.toString.call(val) === '[object Null]') {
					line += printer.null('null' + comma(printer, object, key));
					lines.push(line);
				} else {
					const l = pprintJSON(val, printer, padding + 1);
					lines.push(line + printer.bracers('{'));
					l.forEach(function (line) {
						lines.push(line);
					});
					lines.push(strpad + printer.bracers('}') + comma(printer, object, key));
				}
				break;
			default:
		}
	}

	return lines;
}

module.exports = {
	verify: function (data) {
		try {
			JSON.parse(data);
			return true;
		} catch (e) {
			return false;
		}
	},

	prettyprint: function (data, printer) {
		const obj = JSON.parse(data);
		return pprintJSON(obj, printer);
	}
};
