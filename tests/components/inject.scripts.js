describe("Inject scripts", function () {
	it("should throw an error if no scripts are injected", function () {
		var html = "<div>Hello world!</div>";
		var output = window.teleprint({
			template: {
				html: html
			},
			assets: [
				"https://dl.dropboxusercontent.com/u/34263055/cdn/hello.world.js"
			],
			test: true
		});
		expect(output.scripts).eql(1);
	});
});