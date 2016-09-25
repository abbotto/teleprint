describe("Inject template - Element", function () {
	it("should throw an error if the provided element's outerHTML isn't injected", function () {
		var div = document.createElement("div");
		div.innerHTML = "Hello world!";
		var output = teleprint({
			template: {
				element: div
			},
			test: true
		});
		expect(output.template).eql("<div>Hello world!</div>");
	});
});