'use strict';

const baucis = require('baucis');
const models = require('./lib/models');
const decorators = require('./lib/decorators');

function buildBaucis() {
    Object.keys(models).forEach((key) => {
        if (Object.keys(decorators).indexOf(key) !== -1) {
            decorators[key](baucis.rest(key));
        } else {
            baucis.rest(key);
        }
    });
    return baucis();
}

module.exports = buildBaucis;
