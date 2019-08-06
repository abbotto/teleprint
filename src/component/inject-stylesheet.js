var injectStylesheet = function injectStylesheet(doc, fragment, asset) {
	var link = doc.createElement('link');

	link.type = 'text/css';
	link.rel = 'stylesheet';
	link.href = asset;

	fragment.appendChild(link);
	return fragment;
};
