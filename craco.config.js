const path = require('path');
const CracoAntdPlugin = require('craco-antd');

module.exports = {
    webpack: {
        alias: {
            '@components': path.resolve(__dirname, 'src/components'),
            '@views': path.resolve(__dirname, 'src/views'),
            '@helpers': path.resolve(__dirname, 'src/helpers'),
            '@constants': path.resolve(__dirname, 'src/constants'),
            '@hooks': path.resolve(__dirname, 'src/hooks'),
            '@styles': path.resolve(__dirname, 'src/styles'),
            '@context': path.resolve(__dirname, 'src/context'),
            '@interfaces': path.resolve(__dirname, 'src/interfaces'),
            '@redux': path.resolve(__dirname, 'src/redux'),
        },
    },
    plugins: [
        {
            plugin: CracoAntdPlugin,
            options: {
                customizeThemeLessPath: path.join(__dirname, 'src/theme/variables.less'),
            },
        },
    ],
};
