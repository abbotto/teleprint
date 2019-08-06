var injectScript = function injectScript(doc, fragment, asset) {
	var script = doc.createElement('script');

	script.type = 'text/javascript';
	script.async = false;
	script.src = asset;

	fragment.appendChild(script);
	return fragment;
};
