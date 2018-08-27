'use strict';
const path = require('path');
const gulp = require('gulp');
const eslint = require('gulp-eslint');
const excludeGitignore = require('gulp-exclude-gitignore');
const mocha = require('gulp-mocha');

gulp.task('static', function() {
    return gulp.src('**/*.js')
        .pipe(excludeGitignore())
        .pipe(eslint({configFile: '.eslintrc'}))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
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
        .once('error', (err) => {
            console.error(err);
        });
});

gulp.task('watch', function() {
    gulp.watch(['generators/**/*.js', 'test/**'], ['test']);
});

gulp.task('default', ['static', 'test']);
