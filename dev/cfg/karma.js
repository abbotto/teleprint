const files = [
	'../../teleprint.js',
	'../../test/spec/inject.scripts.spec.js',
	'../../test/spec/inject.stylesheets.spec.js',
	'../../test/spec/inject.template.element.spec.js',
	'../../test/spec/inject.template.html.spec.js',
	'../../test/spec/inject.template.url.spec.js',
	'../../test/spec/print.template.spec.js'
];

const specReporter = {
	failFast: false,
	showSpecTiming: true,
	suppressErrorSummary: false,
	suppressFailed: false,
	suppressPassed: false,
	suppressSkipped: true,
};

const settings = {
	autoWatch: false,
	browserNoActivityTimeout: 100000,
	browsers: ['ChromiumHeadless'],
	captureTimeout: 30000,
	colors: true,
	concurrency: Infinity,
	frameworks: [
		'chai',
		'mocha'
	],
	logLevel: 'INFO',
	port: 9876,
	reporters: [
		'spec'
	],
	singleRun: true,
	files,
	specReporter,
};

module.exports = (config) => config.set(settings);
