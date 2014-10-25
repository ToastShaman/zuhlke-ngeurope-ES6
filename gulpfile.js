var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var wiredep = require('wiredep').stream;
var traceur = require('gulp-traceur');
var concat = require('gulp-concat');
var bowerSrc = require('gulp-bower-src');
var clean = require('gulp-clean');
var webserver = require('gulp-webserver');
var watch = require('gulp-watch');

var sourceTypeConfigs = {
    js: {
        transpileSrc: ['./client/app.js', './client/**/!(app).js'],
        htmlSrc: ['./client/**/*.html'],
        outputDir: './public/js',
        outputExt: 'js'
    }
};

// ------------------
// FRONTEND DEPENDENCIES

gulp.task('client/bowerSrc', function () {
    return bowerSrc().pipe(gulp.dest('./public/vendor'));
});

gulp.task('client/wiredep', ['client/bowerSrc'], function () {
    gulp.src('./public/index.html')
        .pipe(wiredep({
            directory: './public/vendor'
        }))
        .pipe(gulp.dest('./public'));
});

gulp.task('client/copyPartials', function() {
    gulp.src(sourceTypeConfigs.js.htmlSrc, { base: './client' }).pipe(gulp.dest('./public/partials'));
});

// ------------------
// BUILD APP

gulp.task('client/transpile', function() {
    gulp.src(sourceTypeConfigs.js.transpileSrc)
        .pipe(sourcemaps.init())
        .pipe(traceur())
        .pipe(concat('app.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(sourceTypeConfigs.js.outputDir));
});

// ------------------
// WATCHERS

gulp.task('build/watch', function() {
    watch(sourceTypeConfigs.js.transpileSrc, function (files, cb) {
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
            sourceTypeConfigs.js.outputDir
        ], {read: false}).pipe(clean({force: true}));
});

gulp.task('build', ['clean'], function() {
    return gulp.start('client/bowerSrc', 'client/wiredep', 'client/copyPartials', 'client/transpile');
});