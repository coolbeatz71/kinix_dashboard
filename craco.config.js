const CracoLessPlugin = require('craco-less');
const lessToJS = require('less-vars-to-js');
const fs = require('fs');
const path = require('path');

const modifyVars = lessToJS(fs.readFileSync(path.resolve(__dirname, './src/theme/variables.less'), 'utf8'));

module.exports = {
    plugins: [
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
