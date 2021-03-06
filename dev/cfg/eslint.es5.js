module.exports = {
	env: {
		browser: true
	},
    extends: ['eslint-config-airbnb-base/legacy'].map(require.resolve),
	rules: {
		'block-scoped-var': 0,
		'brace-style': 0,
		'consistent-return': 0,
		'func-names': 0,
		'max-len': 0,
		'new-cap': 0,
		'no-bitwise': 0,
		'no-cond-assign': 0,
		'no-console': 0,
		'no-continue': 0,
		'no-empty': 0,
		'no-mixed-operators': 0,
		'no-multi-assign': 0,
		'no-nested-ternary': 0,
		'no-new': 0,
		'no-param-reassign': 0,
		'no-plusplus': 0,
		'no-prototype-builtins': 0,
		'no-restricted-globals': 0,
		'no-restricted-syntax': 0,
		'no-return-assign': 0,
		'no-shadow': 0,
		'no-tabs': 0,
		'no-throw-literal': 0,
		'no-undef': 0,
		'no-underscore-dangle': 0,
		'no-unused-expressions': 0,
		'no-unused-vars': 0,
		'no-use-before-define': 0,
		'no-useless-concat': 0,
		'no-useless-escape': 0,
		'no-var': 0,
		'object-shorthand': 0,
		'one-var': 0,
		'prefer-arrow-callback': 0,
		'prefer-const': 0,
		'prefer-destructuring': 0,
		'prefer-rest-params': 0,
		'prefer-template': 0,
		'semi-style': 0,
		'spaced-comment': 0,
		'vars-on-top': 0,
		'curly': 0,
		'eqeqeq': 0,
		'indent': ['error', 'tab'],
		'radix': 0
	}
};
