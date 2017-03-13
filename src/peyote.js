const pprint = require('../src/pprint');
const printer = require('../src/printer');
const args = process.argv;

function prettyPrint(data, printer) {
	const result = pprint(data, printer);

	if (result === null) {
		console.log(printer.error('Error: ') + printer.dark('unknown type of source') + '\n');
	} else if (result.length > 0) {
		console.log(result.join('\n') + '\n');
	}
}

module.exports = function (theme) {
	const themePrinter = printer(theme);

	if (args.length < 3) {
		process.stdin.resume();
		process.stdin.setEncoding('utf8');
		process.stdin.on('data', function (data) {
			prettyPrint(data, themePrinter);
		});
	} else {
		const data = args[2];
		prettyPrint(data, themePrinter);
	}
};
