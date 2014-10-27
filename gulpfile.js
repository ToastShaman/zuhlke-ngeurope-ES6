var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var wiredep = require('wiredep').stream;
var traceur = require('gulp-traceur');
var concat = require('gulp-concat');
var bowerSrc = require('gulp-bower-src');
var clean = require('gulp-clean');
var webserver = require('gulp-webserver');
var watch = require('gulp-watch');
var preprocess = require('gulp-preprocess');
var less = require('gulp-less');

var config = require('./config-dev.json');

var sourceTypeConfigs = {
    bower: {
        outputDir: './public/vendor'
    },
    css: {
        lessSrc: ['./client/**/*.less'],
        outputDir: './public/css'
    },
    html: {
        htmlSrc: ['./client/**/*.html'],
        outputDir: './public/partials'
    },
    js: {
        transpileSrc: ['./client/app.js', './client/**/!(app).js'],
        htmlSrc: ['./client/**/*.html'],
        lessSrc: ['./client/**/*.less'],
        outputDir: './public/js',
        outputExt: 'js'
    }
};

// ------------------
// FRONTEND DEPENDENCIES

gulp.task('client/bowerSrc', function() {
    return bowerSrc().pipe(gulp.dest(sourceTypeConfigs.bower.outputDir));
});

gulp.task('client/wiredep', ['client/bowerSrc'], function() {
    gulp.src('./public/index.html')
        .pipe(wiredep({
            directory: sourceTypeConfigs.bower.outputDir
        }))
        .pipe(gulp.dest('./public'));
});

gulp.task('client/copyPartials', function() {
    gulp.src(sourceTypeConfigs.html.htmlSrc, {
        base: './client'
    }).pipe(gulp.dest(sourceTypeConfigs.html.outputDir));
});

// ------------------
// BUILD APP

gulp.task('client/less', function() {
    gulp.src(sourceTypeConfigs.css.lessSrc)
        .pipe(less())
        .pipe(concat('app.css'))
        .pipe(gulp.dest(sourceTypeConfigs.css.outputDir));
});

gulp.task('client/transpile', function() {
    gulp.src(sourceTypeConfigs.js.transpileSrc)
        .pipe(preprocess(config))
        .pipe(sourcemaps.init())
        .pipe(traceur())
        .pipe(concat('app.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(sourceTypeConfigs.js.outputDir));
});

// ------------------
// WATCHERS

gulp.task('client/watch', function() {
    watch([sourceTypeConfigs.js.transpileSrc, sourceTypeConfigs.js.htmlSrc], function(files, cb) {
        gulp.start('build', cb);
    });
});

// ------------------
// WEB SERVER

gulp.task('start', ['build'], function() {
    gulp.src('./public').pipe(webserver({
        livereload: true,
        directoryListing: false,
        open: true
    }));
});

// ------------------
// general targets

gulp.task('clean', function() {
    return gulp.src(
        [
            './build',
            './public/vendor',
            './public/partials',
            './public/css',
            sourceTypeConfigs.js.outputDir
        ], {
            read: false
        }).pipe(clean({
        force: true
    }));
});

gulp.task('build', ['clean'], function() {
    return gulp.start('client/bowerSrc', 'client/wiredep', 'client/copyPartials', 'client/transpile', 'client/less');
});