describe("Print the template", function () {
	it("should throw an error if frame.print() won\'t execute", function () {
		var html = "<div>Hello world!</div>";
		var output = teleprint({
			template: {
				html: html
			},
			test: true
		});
		expect(output.print).eql(true);
	});
});