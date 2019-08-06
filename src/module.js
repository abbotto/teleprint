(function (name, global, factory) {
	if (typeof module !== 'undefined' && module.exports) {
		module.exports = factory();
	}
	else if (typeof define === 'function' && define.amd) {
		define(factory);
	}
	else {
		global[name] = factory();
	}
}('teleprint', window || this, function teleprintFactory() {
	//=include component/inject-script.js
	//=include component/inject-stylesheet.js
	//=include component/scrape-asset.js
	//=include component/print-job.js

	/**
	 * @module teleprint
	 * @param {Object} config The print job configuration.
	 * @param {Object} config.template The content that will be printed.
	 * @param {String} config.template.url The path to the content that will be printed.
	 * @param {String} config.template.html A HTML string that will printed.
	 * @param {Object} config.template.element An element whose outerHTML will be printed.
	 * @param {Array} config.assets URLs for individual assets.
	 * @param {Object|Boolean} config.inherit Set to `true` to inherit all styles and scripts from the current document.
	 * @param {Boolean} config.inherit.css Copy all the styles from the current document to the print document.
	 * @param {Boolean} config.inherit.js Copy all the scripts from the current document to the print document.
	 *
	 * @description
	 * Print HTML like a boss
	 * - When 'window.print()' is called, the current document can be printed by the browser.
	 * - In order to print custom HTML instead of the whole document, HTML will be injected into an iframe.
	 * - When 'iframe.print()' is called, the injected HTML can be printed by the browser.
	 * - HTML assets can also be injected into the iframe document and applied to the injected HTML.
	 *
	 * @example
	 * teleprint({
	 *     template: {
	 * 	      html: "<div>Hello world!</div>"
	 *     },
	 *     inherit: true
	 * });
	 */
	teleprint = (function teleprintInit() {
		teleprint = function teleprintConfig(config) {
			return printJob.run(
				(window.document || document),
				config
			);
		};

		if (typeof window !== 'undefined') {
			window.teleprint = teleprint;
		}

		return teleprint;
	}());

	return teleprint;
}));
