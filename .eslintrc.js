module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: [
		"airbnb-base",
	],
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
	},
	rules: {
		quotes: ["error", "double"],
		"func-names": ["error", "never"],
		camelcase: ["error", { allow: [".*"] }],
		"prefer-rest-params": 0,
		"arrow-parens": 0,
		"no-tabs": 0,
		indent: ["error", "tab"],
		"no-sparse-arrays": 0,
		"no-continue": 0,
		"object-shorthand": 0,
		// "no-restricted-globals": 0,
	},
};
