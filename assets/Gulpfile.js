const autoprefixer = require('gulp-autoprefixer'); //
const concat = require('gulp-concat');
const gplumber = require('gulp-plumber');
const gulp = require('gulp');
const gutil = require('gulp-util');
const imageResize = require('gulp-image-resize');
const minifycss = require('gulp-minify-css');
const os = require('os');
const parallel = require("concurrent-transform");
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const sassFiles = 'scss/**/*.?(s)css';
const uglify = require('gulp-uglify');

const errorHandler = function() {
    // default appearance
    return gplumber(function(error) {
        // add indentation
        var msg = error.codeFrame.replace(/\n/g, '\n    ');
        // output styling
        gutil.log('|- ' + gutil.colors.bgRed.bold('Build Error in ' + error.plugin));
        gutil.log('|- ' + gutil.colors.bgRed.bold(error.message));
        gutil.log('|- ' + gutil.colors.bgRed('>>>'));
        gutil.log('|\n    ' + msg + '\n           |');
        gutil.log('|- ' + gutil.colors.bgRed('<<<'));
    });
};


gulp.task('sass', () => {
    gulp.src(sassFiles)
        .pipe(errorHandler())
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(autoprefixer({ browsers: 'last 3 versions' }))
        .pipe(minifycss())
        .pipe(rename('style-embed.html'))
        .pipe(gulp.dest('../layouts/partials/site_header/'))
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest('../static/assets/css/'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('js/partials/*.js')
        .pipe(errorHandler())
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(rename('main.min.js'))
        .pipe(gulp.dest('../static/assets/js/'));
});

gulp.task("image-resize", function() {
    return gulp.src("../_images/*.{jpg,png}")
        .pipe(parallel(
            imageResize({ width: 1200, height: 600 }),
            os.cpus().length
        ))
        .pipe(gulp.dest("../static/assets/images"))
        .pipe(parallel(
            imageResize({ width: 600, height: 300 }),
            os.cpus().length
        ))
        .pipe(gulp.dest("../static/assets/images/_half"))
        .pipe(parallel(
            imageResize({ width: 300, height: 150 }),
            os.cpus().length
        ))
        .pipe(rename(function(path) { path.basename += "-thumb"; }))
        .pipe(gulp.dest("../static/assets/images/_thumbnail"));
});

gulp.task('watch', function() {
    gulp.watch('scss/**/*.scss', ['sass']);
    gulp.watch('js/partials/*.js', ['scripts']);
    gulp.watch('../_images/*.{jpg,png}', ['image-resize']);
});

gulp.task('default', ['sass', 'image-resize', 'watch']);
