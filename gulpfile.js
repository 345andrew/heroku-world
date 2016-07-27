"use strict";

var
    eventStream = require("event-stream"),
    glob = require("tsconfig-glob"),
    gulp = require("gulp"),
    gulpTypings = require("gulp-typings"),
    stripLine  = require('gulp-strip-line'),
    sourcemaps = require("gulp-sourcemaps"),
    tscconfigDev = require("./tsconfig.json"),
    tslint = require('gulp-tslint'),
    typescript = require("gulp-typescript");

// Entry point into the gulp build tasks.
gulp.task("build-all", ['install-typings', 'glob', 'tslint', 'tsc']);

// update the tsconfig files based on the glob pattern
gulp.task('glob', function () {
    return glob({
        configPath: '.',
        configFileName: "tsconfig.json",
        indent: 2
    });
});

// linting
gulp.task('tslint', function() {
    return gulp.src('src/**/*.ts')
        .pipe(tslint())
        .pipe(tslint.report('verbose', {
            emitError: true
        }));
});

// Compile typescript sources
gulp.task('tsc', function() {
    var result = gulp
        .src(tscconfigDev.files)
        .pipe(typescript(tscconfigDev.compilerOptions));

        return eventStream.merge(
          result.dts.pipe(gulp.dest("lib")),
          result.js.pipe(gulp.dest("lib"))
        );
});

// because typings install Ambient to both main.d.ts and browser.d.ts, and the typings cli doesn't have any way far as I can see
// to install only to browser or only to main. Browser side needs e6-shim for compat, but on server-side output compiles to es6 anyway,
// meaning that since typings brings the e6-shim into scope for the e6 server-side, there are duplicate identifiers. Yay.
// So after typings install, go and remove the reference from main.d.ts
gulp.task("typings-clean", function() {
  return gulp
      .src("typings/main.d.ts")
      .pipe(stripLine(["/// <reference path=\"main/ambient/core-js/index.d.ts\" />"]))
      .pipe(gulp.dest("typings"));
});


gulp.task("install-typings",function(){
    var stream = gulp.src("./typings.json")
        .pipe(gulpTypings()); //will install all typingsfiles in pipeline.
    return stream; // by returning stream gulp can listen to events from the stream and knows when it is finished.
});
