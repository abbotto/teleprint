var scrapeAssets = function scrapeAssets(arr, fragment) {
	var defaultStyles;
	var i = 0;
	var len = arr ? arr.length : 0;

	for (; i < len; i++) {
		defaultStyles = arr[i].cloneNode(true);
		fragment.appendChild(defaultStyles);
	}

	return fragment;
};
