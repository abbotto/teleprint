describe("Inject template - URL", function () {
	it("should throw an error if the requested template isn't injected", function () {
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4 && xhr.status === 200) {
				var output = teleprint({
					template: {
						html: this.responseText
					},
					test: true
				});
				expect(output.template).eql("&nbsp;<span>This is Teleprint in action</span>.");
			}
		}
		xhr.open("GET", "http://localhost:8888/index.html", true);
		xhr.send();
	});
});