describe("Print HTML", function () {
	jsdom({
		src: fs.readFileSync("./teleprint.js", "utf-8")
	});
	it("should throw an error if frame.print() won\'t execute", function () {
		var html = "<div>Hello world!</div>";
		var output = teleprint({
			html: html,
			test: true
		});
		expect(output.print).eql(true);
	});
});