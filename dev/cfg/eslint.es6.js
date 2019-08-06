module.exports = {
	env: {
		es6: true,
		node: true
	},
    extends: ['airbnb-base'],
    globals: {
        "teleprint": "writable"
    },
	rules: {
		'comma-dangle': 0,
		'func-names': 0,
		'function-paren-newline': 0,
		'global-require': 0,
		'import/no-dynamic-require': 0,
		'no-console': 0,
		'no-param-reassign': 0,
		'no-path-concat': 0,
		'no-tabs': 0,
		'no-undef': 0,
		'no-unused-expressions': 0,
		'prefer-template': 0,
		'semi-style': 0,
		'vars-on-top': 0,
		indent: ['error', 'tab'],
	}
};
