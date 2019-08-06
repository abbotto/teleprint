describe('Inject template - HTML', () => {
	it("should throw an error if the provided template isn't injected", () => {
		const html = '<div>Hello world!</div>';
		const output = teleprint({
			template: {
				html
			},
			test: true
		});
		expect(output.template).eql('<div>Hello world!</div>');
	});
});
