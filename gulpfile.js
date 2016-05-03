/* jslint node:true, esnext:true */
'use strict';
/*
    Copyright 2016 Enigma Marketing Services Limited

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/
const gulp = require('gulp'),
    mocha = require('gulp-mocha'),
    eslint = require('gulp-eslint');


gulp.task('lint', () => {
    return gulp.src([
        'lib/**/*.js',
        'dust/**/*.js'
    ])
        // pass your directives
        // as an object
        .pipe(eslint({
            extends: 'eslint:recommended',
            ecmaFeatures: {
                'modules': true
            },
            rules: {},
            globals: {},
            envs: [
            'node'
        ]
        }))
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format());
});
gulp.task('test', ['pre-test'], function () {
    return gulp.src([
        'test/**/*.js',
    ])
        .pipe(mocha({
            bail: true,
            timeout: 50000
        }))
        .once('end', function () {
            process.exit();
        });
});
