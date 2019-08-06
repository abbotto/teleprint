describe('Print the template', () => {
	it("should throw an error if 'frame.print()' won't execute", () => {
		const html = '<div>Hello world!</div>';
		const output = teleprint({
			template: {
				html
			},
			test: true
		});
		expect(output.print).eql(true);
	});
});
