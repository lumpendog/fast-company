module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: ["plugin:react/recommended", "standard"],
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        sourceType: "module"
    },
    plugins: ["react"],
    rules: {
        indent: ["error", 4],
        semi: [2, "always"],
        quotes: ["error", "double", { allowTemplateLiterals: true }],
        "space-before-function-paren": [
            "always",
            { anonymous: "always", named: "never" }
        ]
    }
};
