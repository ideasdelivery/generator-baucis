'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-baucis:app', function() {
    before(function() {
        this.timeout(100000);
        return helpers.run(path.join(__dirname, '../generators/app'))
            .withPrompts({
                createDirectory: false,
                jwt:false,
                name:'test'
            })
            .toPromise()
            .then(() => {
                console.log('end');
                return;
            });
    });

    it('creates files', function() {
        assert.file([
            'package.json',
            '.eslintrc',
            'lib/models/schemas/user-schema.js',
            'lib/models/index.js',
            'lib/routes/index.js'
        ]);
    });
});
describe('generator-baucis:app with jwt option', function() {
    before(function() {
        this.timeout(100000);
        return helpers.run(path.join(__dirname, '../generators/app'))
            .withPrompts({
                createDirectory: false,
                jwt:true
            })
            .toPromise();
    });

    it('creates jwt files', function() {
        assert.file([
            'package.json',
            '.eslintrc',
            'lib/models/index.js',
            'lib/routes/index.js',
            'lib/routes/extract-jwt.js',
            'lib/routes/auth.js'
        ]);
    });
});
