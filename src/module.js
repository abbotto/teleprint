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

}("TELEPRINT", typeof window !== "undefined" ? window : this, function () {

	// Version
	var version = "%%GULP_INJECT_VERSION%%";

	// Dependencies
	//=require components/print.js

	/**
	 * @class
	 * @name teleprint
	 * @namespace
	 * @description
	 * Print HTML
	 */
	teleprint = (function () {
		teleprint = function (settings) {
			this.version = version;
			return domPrint(settings);
		};
		// Return the teleprint object and set window.teleprint only if teleprint is undefined
		return ((window.teleprint = teleprint));
	}());

}));