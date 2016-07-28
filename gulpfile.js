"use strict";

var
    message = process.env.MESSAGE,
    eventStream = require("event-stream"),
    glob = require("tsconfig-glob"),
    gulp = require("gulp"),
    replace = require("gulp-replace"),
    runSequence = require("run-sequence"),
    shell = require("gulp-shell"),
    sourcemaps = require("gulp-sourcemaps"),
    tscconfigDev = require("./tsconfig.json"),
    tslint = require('gulp-tslint'),
    typescript = require("gulp-typescript");

// Entry point into the gulp build tasks.
// gulp.task("build-all", ['install-typings', 'glob', 'tslint', 'tsc']);

// sequence for build.
gulp.task("build-all", function(callback) {
runSequence("glob", "tslint", "tsc", callback);
return;
});

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


gulp.task("install-typings",function(){
  return gulp.src("./typings.json", {read: false})
    .pipe(shell([
      "npm run typings install"
    ]));
});



// tokenise the pointer to the API from the client.
gulp.task("tokenize", function(){
  if (!message) {
    message = "Heroku World!!!";
  }

  gulp.src(["lib/server.js"])
    .pipe(replace("Heroku World", message))
    .pipe(gulp.dest(paths.webroot));
});
