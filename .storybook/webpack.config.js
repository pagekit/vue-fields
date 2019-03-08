const path = require('path');

module.exports = ({config}) => {

    // add fields alias
    config.resolve.alias['vue-fields'] = path.resolve(__dirname, '../src')

    return config;
};