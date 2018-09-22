/**
 * Teleprint
 * Author: Jared Abbott
 * URL: https://github.com/abbotto/teleprint/
 * Copyright 2016 Jared Abbott
 * Distributed under the MIT license
 */

(function (name, context, factory) {
	if (typeof module !== "undefined" && module.exports) {
		module.exports = factory();
	}
	else if (typeof define === "function" && define.amd) {
		define(factory);
	}
	else {
		context[name] = factory();
	}
}("TELEPRINT", typeof window !== "undefined" ? window : this, function TELEPRINT_INIT() {
	var version = "%%GULP_INJECT_VERSION%%";

	//=require components/print.js

	/**
	 * @class
	 * @name teleprint
	 * @namespace
	 * @description
	 * Print HTML
	 */
	teleprint = (function TELEPRINT_IIFE() {
		teleprint = function TELEPRINT_GLOBAL(settings) {
			this.version = version;
			return domPrint(settings);
		};

		if (typeof window !== "undefined") {
			window.teleprint = teleprint;
		}

		return teleprint;
	}());

	return teleprint;
}));