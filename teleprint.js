/**
 * Teleprint
 * Author: Jared Abbott
 * URL: https://github.com/abbotto/teleprint/
 * Copyright 2016 Jared Abbott
 * Distributed under the MIT license
 * Version %%VERSION%%
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
	var version = "v1.0.2";

	// Dependencies
	"use strict";
	
	/**
	 * @instance
	 * @memberOf teleprint
	 * @category Printing
	 * @alias teleprint
	 *
	 * @description
	 * - When window.print() is called, the current document can be printed by the browser.
	 * - In order to print custom HTML instead of the whole document, HTML will be injected into an Iframe.
	 * - When iframe.print() is called, the injected HTML can be printed by the browser.
	 * - HTML assets can also be injected into the iframe document and applied to the injected HTML.
	 * 
	 * @param {Object} settings settingsuration setting for the print job.
	 * @param {String|Element} settings.html A HTML string OR an element whose outerHTML is copied
	 * @param {Array} settings.assets URLs for individual assetss
	 * @param {Object|Boolean} settings.inherit Copy css and/or js tags to the print document
	 * @param {Boolean} settings.inherit.css Copy all the existing style tags to the print document
	 * @param {Boolean} settings.inherit.js Copy all the existing js tags to the print document
	 * @param {Boolean} settings.test Causes the fuction to output an object for testing purposes
	 * @param {Object} settings.window A reference to a particular window. Default is the current document window
	 * 
	 * 
	 * @example
	 * var settings = {
	 *     html: ...,
	 *     assets: ...,
	 *     inherit: ...,
	 *     test: ...,
	 *     window: ...
	 * }
	 * 
	 * teleprint(settings);
	 * 
	 */
	
	var domPrint = function domPrint(settings) {
	
		// --------------------------------
		// Pre-flight
		// --------------------------------
		var elementOrHtml = settings.html;
		var assets = settings.assets;
		var inherit = settings.inherit || {};
		var test = settings.test;
		var document = window.document;
		var tests = {
			styles: 0,
			scripts: 0,
			print: true
		};
	
		function nodeTest(node) {
			return (node.nodeType === 1 || node.nodeType === 9 || node.nodeType === 11) ? true : false;
		}
	
		function clearFrame(frameName, frameElement) {
			// Clear the IFrame
			delete window.frames[frameName];
			document.body.removeChild(frameElement);
		}
	
		function scrapeAssets(arr, fragment) {
			var clone;
			var k = 0;
			var len = arr.length;
			for (; k < len; k++) {
				// Clone the original style element
				clone = arr[k].cloneNode(true);
				fragment.appendChild(clone);
			}
			return fragment;
		}
	
		function injectScript(fragment, asset, html) {
			var script = document.createElement("script");
			script.type = "text/javascript";
			script.async = true;
			
			if (!!html) {
				script.innerHTML = asset;
			}
			else {
				script.src = asset;
			}
			fragment.appendChild(script);
			return fragment;
		}
	
		function injectLink(fragment, asset) {
			var link = document.createElement("link");
			link.type = "text/css";
			link.rel = "stylesheet";
			link.href = asset;
			fragment.appendChild(link);
			return fragment;
		}
	
		// --------------------------------
		// Build the iframe document
		// --------------------------------
	
		// Insert the iframe into the current document
		var printHTML = !!nodeTest(elementOrHtml) ? elementOrHtml.outerHTML : elementOrHtml;
		var frameName = ("TELEPRINT-" + Date.now());
		var iFrame = "<iframe style=\"width:1px; height: 1px; position: absolute; left: -9999px\" id=\"" + frameName + "\" name=\"" + frameName + "\">";
		document.body.insertAdjacentHTML("afterBegin", iFrame);
	
		// Insert a document into the current iframe
		var frameElement = document.getElementById(frameName);
		var frame = window.frames[frameName];
		var frameDocument = frame.document;
		var styleFragment = document.createDocumentFragment();
		var scriptFragment = document.createDocumentFragment();
		var frameHTML = "<!DOCTYPE html><html><head></head><body>";
		frameHTML += printHTML;
		frameHTML += "</body></html>";
		frameDocument.open();
		frameDocument.write(frameHTML);
		frameDocument.close();
	
		// --------------------------------
		// Inherit assets
		// --------------------------------
		if (inherit === true || inherit.css === true) {
			// Grab all the linked and embedded assets on the parent document
			var css = document.querySelectorAll("link, style");
			styleFragment = scrapeAssets(css, styleFragment);
		}
		if (inherit === true || inherit.js === true) {
			// Grab all the linked and embedded assets on the parent document
			var js = document.querySelectorAll("script");
			scriptFragment = scrapeAssets(js, scriptFragment);
		}
	
		// --------------------------------
		// Asset handler
		// --------------------------------
		if (Array.isArray(assets)) {
			var link, script;
			var i = 0;
			var len = assets.length;
			for (; i < len; i++) {
				var ext = assets[i].substr(assets[i].lastIndexOf(".") + 1);
				if (ext === "css") {
					styleFragment = injectLink(styleFragment, assets[i]);
				}
				else if (ext === "js") {
					scriptFragment = injectScript(scriptFragment, assets[i]);
				}
			}
		}
	
		// --------------------------------
		// Test output
		// --------------------------------
		tests.styles = styleFragment.children.length;
		tests.scripts = scriptFragment.children.length;
		if (!frame.print) tests.print = false;
	
		// Ensure there is a lastChild when no assets are provided
		if (tests.styles === 0 && tests.scripts === 0) {
			scriptFragment = injectScript(scriptFragment, "// Teleprint", true);
		}
	
		// --------------------------------
		// Execute the print job
		// --------------------------------
		if (!test) {
			// Append assets to the document
			var head = frameDocument.getElementsByTagName("head")[0];
			head.appendChild(styleFragment);
			head.appendChild(scriptFragment);
	
			// Don't print until the assets are loaded
			head.lastChild.addEventListener("load", function (event) {
				// In IE, you have to focus() the IFrame prior to printing
				// or else the top-level page will print instead
				frame.focus();
				frame.print();
				clearFrame(frameName, frameElement);
			}, 0);
		}
		// Return the test output
		else {
			clearFrame(frameName, frameElement);
			return tests;
		}
	}

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