const path = require('path');
const CracoAntdPlugin = require('craco-antd');

module.exports = {
    webpack: {
        configure: {
            // TODO: must be updated later for production optimization
            devtool: 'eval-source-map',
        },
        alias: {
            '@assets': path.resolve(__dirname, 'src/assets'),
            '@components': path.resolve(__dirname, 'src/components'),
            '@views': path.resolve(__dirname, 'src/views'),
            '@helpers': path.resolve(__dirname, 'src/helpers'),
            '@constants': path.resolve(__dirname, 'src/constants'),
            '@hooks': path.resolve(__dirname, 'src/hooks'),
            '@styles': path.resolve(__dirname, 'src/styles'),
            '@context': path.resolve(__dirname, 'src/context'),
            '@interfaces': path.resolve(__dirname, 'src/interfaces'),
            '@redux': path.resolve(__dirname, 'src/redux'),
            '@services': path.resolve(__dirname, 'src/services'),
        },
    },
    plugins: [
        {
            plugin: CracoAntdPlugin,
            options: {
                customizeThemeLessPath: path.join(__dirname, 'src/theme/variables.less'),
                babelPluginImportOptions: { libraryName: 'antd', libraryDirectory: 'es', style: true },
            },
        },
    ],
    devServer: {
        port: 3500,
    },
};
