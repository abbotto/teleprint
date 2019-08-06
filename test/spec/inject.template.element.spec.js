describe('Inject template - Element', () => {
	it("should throw an error if the provided element's outerHTML isn't injected", () => {
		const div = document.createElement('div');
		div.innerHTML = 'Hello world!';
		const output = teleprint({
			template: {
				element: div
			},
			test: true
		});
		expect(output.template).eql('<div>Hello world!</div>');
	});
});
