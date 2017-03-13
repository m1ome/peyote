'use strict';

const chalk = require('chalk');

const defaultTheme = 'light';
const themes = {
	light: {
		error: chalk.red,
		dark: chalk.black,
		bracers: chalk.magenta,
		boolean: chalk.green,
		string: chalk.blue,
		null: chalk.gray,
		number: chalk.red,
		key: chalk.black
	},
	dark: {
		error: chalk.red,
		dark: chalk.white,
		bracers: chalk.magenta,
		boolean: chalk.green,
		string: chalk.blue,
		null: chalk.gray,
		number: chalk.red,
		key: chalk.white
	}
};

module.exports = function (theme) {
	if (theme === undefined) {
		theme = defaultTheme;
	}

	const printer = {};
	const themeObject = themes[theme];

	/* eslint-disable guard-for-in */
	/* eslint-disable no-loop-func */
	for (var key in themeObject) {
		const themer = themeObject[key];

		printer[key] = function (data) {
			return themer(data);
		};
	}

	return printer;
};
