'use strict';
const publicPaths = ['auth/*'];

const prefix = '^\/';
const pathRegexStr = prefix + publicPaths.map((path) => {
    return `(?!${path})`;
}).join('') + '.*';

const pathRegex = new RegExp(pathRegexStr, 'i');

module.exports = {
    publicPaths,
    pathRegex
};
