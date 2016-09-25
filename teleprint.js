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
	var version = "v2.0.0";

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
	 * @param {Object} settings The print job configuration
	 * @param {Object} settings.template The content that will be printed
	 * @param {String} settings.template.url The path to the content that will be printed
	 * @param {String} settings.template.html A HTML string that will printed
	 * @param {Object} settings.template.element An element whose outer HTML will be printed
	 * @param {Array} settings.assets URLs for individual assetss
	 * @param {Object|Boolean} settings.inherit Copy css and/or js tags to the print document
	 * @param {Boolean} settings.inherit.css Copy all the existing style tags to the print document
	 * @param {Boolean} settings.inherit.js Copy all the existing js tags to the print document
	 * @param {Boolean} settings.test Causes the fuction to output an object for testing purposes
	 * 
	 * 
	 * @example
	 * var settings = {
	 *     template: {
	 * 	       url: ...,
	 * 		   html: ...,
	 * 		   element: ...
	 *     },
	 *     assets: ...,
	 *     inherit: ...,
	 *     test: ...
	 * }
	 * 
	 * teleprint(settings);
	 */
	
	var domPrint = function domPrint(settings) {
	
		// Pre-flight
		var url = settings.template.url;
		var html = settings.template.html;
		var element = !!settings.template.element ? settings.template.element.outerHTML : null;
		var assets = settings.assets;
		var test = settings.test;
		var inherit = settings.inherit || {};
		var document = window.document;
		var job = {
			styles: 0,
			scripts: 0,
			template: false,
			print: true
		}
	
		function finalizeJob(frameName, frameElement) {
			// Clear the IFrame
			delete window.frames[frameName];
			document.body.removeChild(frameElement);
			return job;
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
	
		function injectScript(fragment, asset) {
			var script = document.createElement("script");
			script.type = "text/javascript";
			script.async = false;
			script.src = asset;
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
	
		// Inject the template for printing
		if (!html && !element && !!url) {
			var request = window.XMLHttpRequest || ActiveXObject;
			var xhr = new request("MSXML2.XMLHTTP.3.0");
			xhr.onreadystatechange = function () {
				if (xhr.readyState === 4 && xhr.status === 200) {
					return printReady(this.responseText);
				}
			}
			xhr.open("GET", url, true);
			xhr.send();
		}
		else {
			return printReady((html || element));
		}
	
		// Print when ready
		function printReady(printingTemplate) {
			// Build the iframe
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
			frameHTML += printingTemplate;
			frameHTML += "</body></html>";
			frameDocument.open();
			frameDocument.write(frameHTML);
			frameDocument.close();
	
			// Inherit assets
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
	
			// Asset handler
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
	
			// Job output
			job.styles = styleFragment.children.length;
			job.scripts = scriptFragment.children.length;
			job.template = printingTemplate;
			if (!frame.print) job.print = false;
	
			// Execute the print job
			function printJob() {
				// In IE, you have to focus() the IFrame prior to printing
				// or else the top-level page will print instead
				if (!test) frame.focus();
				if (!test) frame.print();
				return finalizeJob(frameName, frameElement);
			}
	
			// Append assets to the head
			var head = frameDocument.getElementsByTagName("head")[0];
			head.appendChild(styleFragment);
			head.appendChild(scriptFragment);
	
			// Get the last appended asset
			var lastChild = head.lastChild;
			if (!lastChild || !!test) return printJob();
	
			// The load event is fired when a resource
			// and its dependent resources have finished loading.
			lastChild.addEventListener("load", function (event) {
				return printJob();
			}, 0);
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