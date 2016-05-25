"use strict";

const expect = require('chai').expect;
const pprint = require('../src/pprint');
const jsonParser = require('../src/parser/json');

describe("JSON", function () {

    it('should not parse invalid JSON object', function () {

        const notJSON = '{a;a;;aa}';
        expect(jsonParser.verify(notJSON)).to.be.false;

    });

    it('should parse empty JSON object', function () {

        const emptyJSON = '{}';
        const result = pprint(emptyJSON);

        expect(result).to.be.array;
        expect(result).to.have.length(0);

    });

    it('should parse simple JSON object', function () {

        const simpleJSON = '{"name": "Mocha", "age": 10, "price": null, "domain": true, "list": [1, 2, 3]}';
        const result = pprint(simpleJSON);
        const expectedResult = [
            '\u001b[30mname: \u001b[39m\u001b[34m"Mocha"\u001b[30m,\u001b[34m\u001b[39m',
            '\u001b[30mage: \u001b[39m\u001b[31m10\u001b[30m,\u001b[31m\u001b[39m',
            '\u001b[30mprice: \u001b[39m\u001b[90mnull\u001b[30m,\u001b[90m\u001b[39m',
            '\u001b[30mdomain: \u001b[39m\u001b[32mtrue\u001b[30m,\u001b[32m\u001b[39m',
            '\u001b[30mlist: \u001b[39m\u001b[35m[\u001b[39m',
            '  \u001b[31m1\u001b[30m,\u001b[31m\u001b[39m',
            '  \u001b[31m2\u001b[30m,\u001b[31m\u001b[39m',
            '  \u001b[31m3\u001b[39m',
            '\u001b[35m]\u001b[39m'
        ];

        expect(result).to.be.array;
        expect(result).to.have.length(9);

        expectedResult.forEach(function (val, idx) {
            expect(result[idx]).to.equal(val);
        });

    });

    it('should parse complex JSON object', function () {
        const simpleJSON = '{"name": "Mocha", "age": 10, "price": null, "domain": true, "list": [1, 2, 3], "object" : {"name": true, "object": {"name": false}}}';
        const result = pprint(simpleJSON);

        const expectedResult = [
            '\u001b[30mname: \u001b[39m\u001b[34m"Mocha"\u001b[30m,\u001b[34m\u001b[39m',
            '\u001b[30mage: \u001b[39m\u001b[31m10\u001b[30m,\u001b[31m\u001b[39m',
            '\u001b[30mprice: \u001b[39m\u001b[90mnull\u001b[30m,\u001b[90m\u001b[39m',
            '\u001b[30mdomain: \u001b[39m\u001b[32mtrue\u001b[30m,\u001b[32m\u001b[39m',
            '\u001b[30mlist: \u001b[39m\u001b[35m[\u001b[39m',
            '  \u001b[31m1\u001b[30m,\u001b[31m\u001b[39m',
            '  \u001b[31m2\u001b[30m,\u001b[31m\u001b[39m',
            '  \u001b[31m3\u001b[39m',
            '\u001b[35m]\u001b[39m\u001b[30m,\u001b[39m',
            '\u001b[30mobject: \u001b[39m\u001b[35m{\u001b[39m',
            '\u001b[30m  name: \u001b[39m\u001b[32mtrue\u001b[30m,\u001b[32m\u001b[39m',
            '\u001b[30m  object: \u001b[39m\u001b[35m{\u001b[39m',
            '\u001b[30m    name: \u001b[39m\u001b[32mfalse\u001b[39m',
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