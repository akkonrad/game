var gulp = require('gulp');

var sass   = require('gulp-sass');
var concat = require('gulp-concat');
var merge = require('merge-stream');

var js_scripts = [

    // base
    'app/app.js',

    // item module
    'app/*/*.mock.js',
    'app/*/*.service.js',
    'app/*/*.directive.js'

];

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('dist/sass/*.scss')
        .pipe(sass())
        .pipe(concat('style.css'))
        .pipe(gulp.dest('dist/css'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src(js_scripts)
        .pipe(concat('script.js'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('watch', function() {
    gulp.watch(js_scripts, ['scripts']);
    gulp.watch('dist/sass/*.scss', ['sass']);
});


gulp.task('default', ['sass', 'scripts', 'watch']);
