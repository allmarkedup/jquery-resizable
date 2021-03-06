﻿var gulp = require('gulp');
var rimraf = require('gulp-rimraf');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var livereload = require('gulp-livereload');
var jsFilter = require('gulp-filter')(['*.js'], { restore: true });

    gulp.task('scripts', function () {

        gulp.src(['src/*.js'])
            
            .pipe(sourcemaps.init({ includeContent: false, sourceRoot: './' }))
            .pipe(uglify())   
            .pipe(sourcemaps.write('.', {
                sourceMappingURL: function(file) {
                    return file.relative + '.map';
                }
            }))        
            .pipe(jsFilter)
            .pipe(rename({ suffix: '.min' }))
            .pipe(jsFilter.restore)
            .pipe(gulp.dest('./dist'));

        gulp.src(['src/*.js'])
            .pipe(gulp.dest('./dist'));
    });

gulp.task('fix', function() {
    gulp.src(['./dist/**.js.min.map'])
        .pipe(rimraf())
        .pipe(rename(function(path) {                
                path.dirname = "";
                path.basename = "jquery-resizable";
                path.extname = ".js.map";
            })        )
        .pipe(gulp.dest('./dist'));
});


gulp.task('clean', function () {
    gulp.src(['./dist/**.*'])
        .pipe(rimraf({read: false}));    
});

gulp.task('watch', function () {
    // Create LiveReload server
    livereload.listen();

    gulp.watch(['src/*.js'], ['scripts']);    
});

gulp.task('default', function() {
    // place code for your default task here
    gulp.start( 'scripts');
});

