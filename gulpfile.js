var gulp = require('gulp');

var less   = require('gulp-less');
var concat = require('gulp-concat');
var merge = require('merge-stream');
var cleanCSS = require('gulp-clean-css');

var js_scripts = [

    // base
    'app/app.js',

    // item module
    'app/*/*.mock.js',
    'app/*/*.service.js',
    'app/*/*.directive.js'
];

// Compile Our Sass
gulp.task('less', function() {
    return gulp.src('dist/less/game.less')
        .pipe(less({ style: 'compressed' }))
        .pipe(concat('style.css'))
        .pipe(gulp.dest('dist/css'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src(js_scripts)
        .pipe(concat('script.js'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('minify-css', function() {
    return gulp.src('dist/css/*.css')
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('watch', function() {
    gulp.watch(js_scripts, ['scripts']);
    gulp.watch('dist/css/*.css', ['minify-css']);
    gulp.watch('dist/less/*.less', ['less']);
});


gulp.task('default', ['less', 'scripts', 'minify-css', 'watch']);
