const path = require('path');

module.exports = (baseConfig, configType, config) => {

    // add fields alias
    config.resolve.alias['vue-fields'] = path.resolve(__dirname, '../src')

    return config;
};