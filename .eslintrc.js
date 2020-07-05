module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es2020: true,
        node: true,
    },
    extends: ['eslint:recommended', 'plugin:react/recommended'],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 11,
    },
    plugins: ['react'],
    rules: {},
}
