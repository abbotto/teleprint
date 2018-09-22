describe("Inject template - HTML", function () {
	it("should throw an error if the provided template isn't injected", function () {
		var html = "<div>Hello world!</div>";
		var output = teleprint({
			template: {
				html: html
			},
			test: true
		});
		expect(output.template).eql("<div>Hello world!</div>");
	});
});