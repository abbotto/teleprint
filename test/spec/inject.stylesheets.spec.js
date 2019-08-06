describe('Inject stylesheets', () => {
	it('should throw an error if no stylesheets are injected', () => {
		const html = '<div>Hello world!</div>';
		const output = teleprint({
			template: {
				html
			},
			assets: [
				'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css'
			],
			test: true
		});

		console.log('teleprint', output);

		expect(output.styles).eql(1);
	});
});
