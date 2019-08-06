describe('Inject template - URL', () => {
	it("should throw an error if the requested template isn't injected", () => {
		const xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4 && xhr.status === 200) {
				const output = teleprint({
					template: {
						html: this.responseText
					},
					test: true
				});
				expect(output.template).eql('&nbsp;<span>This is Teleprint in action</span>.');
			}
		};
		xhr.open('GET', 'http://localhost:8888/index.html', true);
		xhr.send();
	});
});
