const gulp = require('gulp');

// Include Plugins
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const gutil = require('gulp-util');
const imagefull = 1200;
const imagehalf = 600;
const imagethumb = 300;
const imagemin = require('gulp-imagemin');
const imageresize = require('gulp-image-resize');
const minifycss = require('gulp-minify-css');
const os = require('os');
const parallel = require("concurrent-transform");
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const sassdoc = require('sassdoc');
const sassFiles = 'scss/**/*.scss';
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');

gulp.task('sassdoc', () => {
    var options = {
        dest: '../static/sassdoc',
        verbose: true,
        basePath: 'https://github.com/rdwatters/ryanwattersio-new/tree/master/pipeline'
    };

    return gulp.src('scss/**/*.scss')
        .pipe(sassdoc(options));
});

gulp.task('sass', () => {
    return gulp.src(sassFiles)
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(minifycss())
        .pipe(rename('style.min.css'))
        .pipe(sourcemaps.write('sourcemaps/'))
        .pipe(gulp.dest('../static/assets/css'))
        .pipe(rename('style-embed.html'))
        .pipe(gulp.dest('../layouts/partials/site_header'));
});

gulp.task('ie9sass', () => {
    return gulp.src('scss/ie9.scss')
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(minifycss())
        .pipe(rename('ie9.css'))
        .pipe(gulp.dest('../static/assets/css'))
});

// Concatenate & Minify JS
gulp.task('scripts', () => {
    return gulp.src(['js/_velocity.js','js/scripts/*js'])
        .pipe(sourcemaps.init())
        .pipe(concat('main.js'))
        .pipe(gulp.dest('js'))
        .pipe(babel({
            presets: ['es2015']
        }))
        .on('error', function(e) {
            console.log('>>> ERROR', e);
            this.emit('end');
        })
        .pipe(uglify())
        .pipe(rename('main.min.js'))
        .pipe(sourcemaps.write('sourcemaps/'))
        .pipe(gulp.dest('../static/assets/js'));
});

gulp.task("image-resize", () => {
    return gulp.src("../source-images/*.{jpg,png,jpeg,gif}")
        .pipe(imagemin())
        .pipe(parallel(
            imageresize({ width: imagefull }),
            os.cpus().length
        ))
        .pipe(gulp.dest("../static/assets/images"))
        .pipe(parallel(
            imageresize({ width: imagehalf }),
            os.cpus().length
        ))
        .pipe(gulp.dest("../static/assets/images/half"))
        .pipe(parallel(
            imageresize({ width: imagethumb }),
            os.cpus().length
        ))
        .pipe(gulp.dest("../static/assets/images/thumbs"));
});

gulp.task('dev', ['sass', 'scripts', 'image-resize'], () => {
    gulp.watch(['scss/*.scss', 'scss/**/*scss'], ['sass']);
    gulp.watch("js/scripts/*.js", ['scripts']);
    gulp.watch("../source-images/*.{jpg,png,jpeg}", ['image-resize']);
    gulp.watch("scss/ie9.scss", ['ie9sass']);
});

// Default Task
gulp.task('default', ['dev']);
gulp.task('images',['image-resize']);
gulp.task('docs', ['sassdoc']);
