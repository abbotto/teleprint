var chai = require('chai');
var expect = chai.expect;
var jsdom = require('jsdom');

// Server
const http = require("http");
const st = require('st');
const PORT = 8888;

const staticHandler = st({
	path: `${__dirname}/tests`,
	index: "index.html"
});

const server = http.createServer((req, resp) => {
	staticHandler(req, resp);
}).listen(PORT);

before(function () {
    server.listen(8888);
});

after(function () {
    server.close();
});

// Load Teleprint before each test
let window;
beforeEach(done => {
	jsdom.env({
		html: '',
		scripts: [require.resolve("../teleprint.js")],
		done(err, createdWindow) {
			if (err) return done(err);
			window = createdWindow;
			document = window.document;
			global.XMLHttpRequest = window.XMLHttpRequest = XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
			teleprint = window.teleprint;
			done();
		}
	});
});
