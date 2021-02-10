module.exports = {
    presets: ['next/babel'],
    plugins: [
        [
            'babel-plugin-react-intl',
            {
                ast: true,
                idInterpolationPattern: '[sha512:contenthash:base64:6]',
                extractFromFormatMessageCall: true,
            },
        ],
    ],
};