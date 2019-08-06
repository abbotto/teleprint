describe('Inject scripts', () => {
	it('should throw an error if no scripts are injected', () => {
		const html = '<div>Hello world!</div>';
		const output = window.teleprint({
			template: {
				html
			},
			assets: [
				'https://dl.dropboxusercontent.com/u/34263055/cdn/hello.world.js'
			],
			test: true
		});
		expect(output.scripts).eql(1);
	});
});
