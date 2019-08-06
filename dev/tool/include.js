#!/usr/bin/env node

const fs = require('fs');

const include = (root, output) => {
	let rootContent = fs.readFileSync(root, 'utf8');
	const matches = rootContent.match(/^(\s+)?(\/\/|\/\*|#|<!--)(\s+)?=(\s+)?(include)(.+$)/mg);

	(matches && matches.length) && matches.forEach((match) => {
		const filename = __dirname
			+ '/../../src/'
			+ match.split('//=include ')[1]
		;

		if (filename.indexOf('undefined') < 0) {
			rootContent = rootContent.split(match)
				.join(fs.readFileSync(filename, 'utf8'))
			;
		}
	});

	fs.writeFile(
		output,
		rootContent,
		{ flag: 'wx' },
		(error) => error
	);
};

include(
	__dirname + '/../../src/module.js',
	__dirname + '/../../teleprint.js'
);
