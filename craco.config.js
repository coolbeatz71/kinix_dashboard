const fs = require('fs');
const path = require('path');
const lessToJS = require('less-vars-to-js');
const CracoLessPlugin = require('craco-less');
const { CracoAliasPlugin, configPaths } = require('react-app-rewire-alias');

const modifyVars = lessToJS(fs.readFileSync(path.resolve(__dirname, './src/theme/variables.less'), 'utf8'));

module.exports = {
    plugins: [
        {
            plugin: CracoAliasPlugin,
            options: { alias: configPaths('./tsconfig.paths.json') },
        },
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars,
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};
