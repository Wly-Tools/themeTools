module.exports = {
	// extends: ['airbnb-base'],
	env: {
		browser: true,
		es6: true,
		amd: true
	},
	globals: {
		$: 'readonly',
		_: 'readonly',
		process: 'readonly'
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2018,
		sourceType: 'module'
	},
	plugins: ['@typescript-eslint'],
	rules: {
		indent: 'off',
		'comma-dangle': ['error', 'never'],
		'func-names': ['off', 'as-needed'],
		'class-methods-use-this': ['off'],
		'no-underscore-dangle': ['off'],
		'no-plusplus': ['off'],
		'no-continue': ['off'],
		// 'no-dupe-class-members': ['off'],
		'import/no-unresolved': ['off'],
		'no-bitwise': ['off'],
		'no-param-reassign': ['off'],
		'import/prefer-default-export': ['off'],
		'no-multi-spaces': ['off'],
		'import/extensions': ['off'],
		'import/no-amd': ['off'],
		'max-len': ['error', { code: 120 }],
		semi: 'off',
		'@typescript-eslint/semi': ['error'],
		'operator-linebreak': ['error', 'after'],
		'no-useless-constructor': ['off'],
		'no-unused-vars': ['off'],
		'linebreak-style': ['off'],
		'max-classes-per-file': ['off'],
		'object-curly-newline': ['error', { consistent: true }]
	}
};
