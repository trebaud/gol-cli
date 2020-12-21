#!/usr/bin/env node
'use strict';
const React = require('react');
const importJsx = require('import-jsx');
const {render} = require('ink');
const meow = require('meow');

const gol = importJsx('./gol');

const cli = meow(`
	Usage
	  $ gol-cli

	Options
		--name  Your name

	Examples
	  $ gol-cli --name=Jane
	  Hello, Jane
`);

render(React.createElement(gol, cli.flags));
