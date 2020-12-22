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
		--cellColor  Cell color
		--bgColor  Background color
		--template  Starting pattern (glider, pulsar), default is random

	Examples
    $ gol-cli --gridBorder=classic --cellColor=magenta --template=pulsar
`);

render(React.createElement(gol, cli.flags));
