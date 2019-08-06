var printJob = {};

printJob.frame = function printJobFrame(
	doc,
	frame,
	frameName,
	frameElement,
	job,
	config
) {
	// In IE, you have to focus() the IFrame prior to printing
	// or else the top-level page will print instead
	if (config && !config.test) frame.focus();
	if (config && !config.test) frame.print();

	delete window.frames[frameName];
	doc.body.removeChild(frameElement);

	return job;
};

printJob.run = function printJobRun(
	doc,
	config
) {
	var html = config.template.html;
	var url = config.template.url;

	var element = config.template.element
		? config.template.element.outerHTML
		: null
	;

	if (!html && !element && url) {
		var request = window.XMLHttpRequest || ActiveXObject;
		var xhr = new request('MSXML2.XMLHTTP.3.0');

		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4 && xhr.status === 200) {
				return printJob.init(
					doc,
					this.responseText,
					config
				);
			}
		};

		xhr.open('GET', url, true);
		xhr.send();
	}
	else {
		return printJob.init(
			doc,
			(html || element),
			config
		);
	}
};

printJob.init = function printJobInit(
	doc,
	printingTemplate,
	config
) {
	var frameName = ('TELEPRINT-' + Date.now());
	var iFrame = '<iframe style="width:1px; height: 1px; position: absolute; left: -9999px" id="' + frameName + '" name="' + frameName + '">';

	doc.body.insertAdjacentHTML('afterBegin', iFrame);

	var frame = window.frames[frameName];
	var frameDocument = frame.document;
	var frameElement = doc.getElementById(frameName);
	var scriptFragment = doc.createDocumentFragment();
	var styleFragment = doc.createDocumentFragment();
	var frameHTML = '<!DOCTYPE html><html><head></head><body>';

	frameHTML += printingTemplate;
	frameHTML += '</body></html>';
	frameDocument.open();
	frameDocument.write(frameHTML);
	frameDocument.close();

	var job = {
		styles: 0,
		scripts: 0,
		template: printingTemplate || false,
		print: !!frame.print
	};

	if (config.inherit) {
		if (config.inherit.css) {
			var css = doc.querySelectorAll('link, style');
			styleFragment = scrapeAsset(css, styleFragment);
		}

		if (config.inherit.js) {
			var js = doc.querySelectorAll('script');
			scriptFragment = scrapeAsset(js, scriptFragment);
		}
	}

	if (Array.isArray(config.assets)) {
		var i = 0;

		var len = config.assets
			? config.assets.length
			: 0
		;

		for (; i < len; i++) {
			var ext = config.assets[i].substr(config.assets[i].lastIndexOf('.') + 1);

			if (ext === 'css') {
				styleFragment = injectStylesheet(doc, styleFragment, config.assets[i]);
			}
			else if (ext === 'js') {
				scriptFragment = injectScript(doc, scriptFragment, config.assets[i]);
			}
		}
	}

	job.styles = styleFragment.children
		? styleFragment.children.length
		: 0
	;

	job.scripts = scriptFragment.children
		? scriptFragment.children.length
		: 0
	;

	var head = frameDocument.getElementsByTagName('head')[0];

	head.appendChild(styleFragment);
	head.appendChild(scriptFragment);

	var headLastChild = head.lastChild;

	if (!headLastChild || config.test) {
		return printJob.frame(
			doc,
			frame,
			frameName,
			frameElement,
			job,
			config
		);
	}

	var timeout = true;
	var count = 0;

	// The load event is fired when a resource
	// and its dependent resources have finished loading
	// NOTE: FF and IE browsers wouldn't work without calling setInterval
	headLastChild.addEventListener('load', function () {
		timeout = false;
	}, 0);

	var interval = setInterval(function () {
		if (!timeout) {
			clearInterval(interval);

			return printJob.frame(
				doc,
				frame,
				frameName,
				frameElement,
				job,
				config
			);
		}

		// Fail after trying for 5 seconds
		if (count === 20) {
			clearInterval(interval);
			console.log('Print job timed out.');
		}

		count += 1;
	}, 250);
};
