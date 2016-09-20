describe("Inject stylesheets", function () {
	jsdom({
		src: fs.readFileSync("./teleprint.js", "utf-8")
	});
	it("should throw an error if no stylesheets are injected", function () {
		var html = "<div>Hello world!</div>";
		var output = teleprint({
			html: html,
			assets: [
				"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
			],
			test: true
		});
		expect(output.styles).eql(1);
	});
});