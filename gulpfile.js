'use strict';
var path = require('path');
var gulp = require('gulp');
var eslint = require('gulp-eslint');
var excludeGitignore = require('gulp-exclude-gitignore');
var mocha = require('gulp-mocha');
var nsp = require('gulp-nsp');

gulp.task('static', function() {
    return gulp.src('**/*.js')
        .pipe(excludeGitignore())
        .pipe(eslint({configFile: '.eslintrc'}))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('nsp', function(cb) {
    nsp({
        package: path.resolve('package.json')
    }, cb);
});

gulp.task('pre-test', function() {
    return gulp.src('generators/**/*.js')
        .pipe(excludeGitignore());
});

gulp.task('test', ['pre-test'], function(cb) {
    var mochaErr;
    gulp.src('test/**/*.js')
        .pipe(mocha({
            reporter: 'spec',
            exit:true
        }))
        .on('error', (err) => {
            console.error(err);
        });
});

gulp.task('watch', function() {
    gulp.watch(['generators/**/*.js', 'test/**'], ['test']);
});

gulp.task('prepublish', ['nsp']);
gulp.task('default', ['static', 'test']);
