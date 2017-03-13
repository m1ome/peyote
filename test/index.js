'use strict';

const expect = require('chai').expect;
const chalk = require('chalk');
const pprint = require('../src/pprint');
const jsonParser = require('../src/parser/json');
const csvParser = require('../src/parser/csv');
const printer = require('../src/printer');

const darkPrinter = printer("dark");

describe('Printer', function () {
	// error: chalk.red,
	// dark: chalk.white,
	// bracers: chalk.magenta,
	// boolean: chalk.green,
	// string: chalk.blue,
	// null: chalk.gray,
	// number: chalk.red,
	// key: chalk.white	
	it('should have methods for "dark" theme', function() {
		const p = printer("dark");

		expect(p.bracers("bracers")).to.equal(chalk.magenta("bracers"));
		expect(p.dark("dark")).to.equal(chalk.white("dark"));
		expect(p.error("error")).to.equal(chalk.red("error"));
		expect(p.boolean("boolean")).to.equal(chalk.green("boolean"));
		expect(p.string("string")).to.equal(chalk.blue("string"));
		expect(p.null("null")).to.equal(chalk.gray("null"));
		expect(p.number("number")).to.equal(chalk.red("number"));
		expect(p.key("key")).to.equal(chalk.white("key"));
	});

	// error: chalk.red,
	// dark: chalk.black,
	// bracers: chalk.magenta,
	// boolean: chalk.green,
	// string: chalk.blue,
	// null: chalk.gray,
	// number: chalk.red,
	// key: chalk.black
	it('should have methods for "light" theme and "light" is default', function() {
		const p = printer();

		expect(p.bracers("bracers")).to.equal(chalk.magenta("bracers"));
		expect(p.dark("dark")).to.equal(chalk.black("dark"));
		expect(p.error("error")).to.equal(chalk.red("error"));
		expect(p.boolean("boolean")).to.equal(chalk.green("boolean"));
		expect(p.string("string")).to.equal(chalk.blue("string"));
		expect(p.null("null")).to.equal(chalk.gray("null"));
		expect(p.number("number")).to.equal(chalk.red("number"));
		expect(p.key("key")).to.equal(chalk.black("key"));	
	});
});

describe('JSON', function () {

	it('should not parse invalid JSON object', function () {

		const notJSON = '{a;a;;aa}';
		expect(jsonParser.verify(notJSON)).to.be.false;

	});

	it('should parse empty JSON object', function () {

		const emptyJSON = '{}';
		const result = pprint(emptyJSON, darkPrinter);

		expect(result).to.be.array;
		expect(result).to.have.length(0);

	});

	it('should parse simple JSON object', function () {
		const simpleJSON = '{"name": "Mocha", "age": 10, "price": null, "domain": true, "list": [1, 2, 3], "object": {"inner": 100}}';
		const result = pprint(simpleJSON, darkPrinter);
		const expectedResult = [
			'\u001b[37mname: \u001b[39m\u001b[34m"Mocha"\u001b[37m,\u001b[34m\u001b[39m',
			'\u001b[37mage: \u001b[39m\u001b[31m10\u001b[37m,\u001b[31m\u001b[39m',
			'\u001b[37mprice: \u001b[39m\u001b[90mnull\u001b[37m,\u001b[90m\u001b[39m',
			'\u001b[37mdomain: \u001b[39m\u001b[32mtrue\u001b[37m,\u001b[32m\u001b[39m',
			'\u001b[37mlist: \u001b[39m\u001b[35m[\u001b[39m',
			'  \u001b[31m1\u001b[37m,\u001b[31m\u001b[39m',
			'  \u001b[31m2\u001b[37m,\u001b[31m\u001b[39m',
			'  \u001b[31m3\u001b[39m',
			'\u001b[35m]\u001b[39m\u001b[37m,\u001b[39m',
			'\u001b[37mobject: \u001b[39m\u001b[35m{\u001b[39m',
			'\u001b[37m  inner: \u001b[39m\u001b[31m100\u001b[39m',
			'\u001b[35m}\u001b[39m'
		];

		expect(result).to.be.array;
		expect(result).to.have.length(12);

		expectedResult.forEach(function (val, idx) {
			expect(result[idx]).to.equal(val);
		});

	});

	it('should parse complex JSON object', function () {
		const simpleJSON = '{"name": "Mocha", "age": 10, "price": null, "domain": true, "list": [1, 2, 3], "object" : {"name": true, "object": {"name": false}}}';
		const result = pprint(simpleJSON, darkPrinter);

		const expectedResult = [
			'\u001b[37mname: \u001b[39m\u001b[34m"Mocha"\u001b[37m,\u001b[34m\u001b[39m',
			'\u001b[37mage: \u001b[39m\u001b[31m10\u001b[37m,\u001b[31m\u001b[39m',
			'\u001b[37mprice: \u001b[39m\u001b[90mnull\u001b[37m,\u001b[90m\u001b[39m',
			'\u001b[37mdomain: \u001b[39m\u001b[32mtrue\u001b[37m,\u001b[32m\u001b[39m',
			'\u001b[37mlist: \u001b[39m\u001b[35m[\u001b[39m',
			'  \u001b[31m1\u001b[37m,\u001b[31m\u001b[39m',
			'  \u001b[31m2\u001b[37m,\u001b[31m\u001b[39m',
			'  \u001b[31m3\u001b[39m',
			'\u001b[35m]\u001b[39m\u001b[37m,\u001b[39m',
			'\u001b[37mobject: \u001b[39m\u001b[35m{\u001b[39m',
			'\u001b[37m  name: \u001b[39m\u001b[32mtrue\u001b[37m,\u001b[32m\u001b[39m',
			'\u001b[37m  object: \u001b[39m\u001b[35m{\u001b[39m',
			'\u001b[37m    name: \u001b[39m\u001b[32mfalse\u001b[39m',
			'  \u001b[35m}\u001b[39m',
			'\u001b[35m}\u001b[39m'
		];

		expect(result).to.be.array;
		expect(result).to.have.length(15);

		expectedResult.forEach(function (val, idx) {
			expect(result[idx]).to.equal(val);
		});

	});

});


describe("CSV", function () {

	it('should not parse invalid CSV object', function () {

		const notCSV = '{"name": "Pavel", "surname": "Makarenko"}';
		expect(csvParser.verify(notCSV)).to.be.false;

	});

	it('should parse simple CSV', function () {

		const simpleCSV = [
			'name,surname,age,male',
			'billy,jean,23,false',
			'michael,jackson,,true'
		];

		const result = pprint(simpleCSV.join('\n'), darkPrinter);
		const expectedResult = [
			'\u001b[35m[\u001b[39m',
			'\u001b[37m  name: \u001b[39m\u001b[34m"billy"\u001b[39m',
			'\u001b[37m  surname: \u001b[39m\u001b[34m"jean"\u001b[39m',
			'\u001b[37m  age: \u001b[39m\u001b[31m23\u001b[39m',
			'\u001b[37m  male: \u001b[39m\u001b[32mfalse\u001b[39m',
			'\u001b[35m]\u001b[39m',
			'\u001b[35m[\u001b[39m',
			'\u001b[37m  name: \u001b[39m\u001b[34m"michael"\u001b[39m',
			'\u001b[37m  surname: \u001b[39m\u001b[34m"jackson"\u001b[39m',
			'\u001b[37m  age: \u001b[39m\u001b[90mnull\u001b[39m',
			'\u001b[37m  male: \u001b[39m\u001b[32mtrue\u001b[39m',
			'\u001b[35m]\u001b[39m'
		];

		expect(result).to.be.array;
		expect(result).to.have.length(expectedResult.length);

		expectedResult.forEach(function (val, idx) {
			expect(result[idx]).to.equal(val);
		});

	});

});
