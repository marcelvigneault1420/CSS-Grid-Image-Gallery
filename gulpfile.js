var gulp = require('gulp');
var sass = require('gulp-sass');
var gulpIf = require('gulp-if');
var sync = require('browser-sync');
var concat = require('gulp-useref');
var uglifyJS = require('gulp-terser');
var uglifyCSS = require('gulp-cssnano');

/* Images (Minify, adding the suffixe .min, etc.) */
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
var imageminZopfli = require('imagemin-zopfli');
var imageminMozjpeg = require('imagemin-mozjpeg');
var imageminGiflossy = require('imagemin-giflossy');
var imageminPngquant = require('imagemin-pngquant');

var del = require('del');

const DEV_PATHS = {
    base: 'app',
    html: 'app/**/*.html',
    scss: 'app/scss/**/*.scss',
    css: 'app/css',
    js: 'app/js/**/*.js',
    img: 'app/**/*.+(png|jpg|gif|svg|jpeg)',
    font: 'app/font/**/*',
};

const PROD_PATHS = {
    base: 'build',
    html: 'build/**/*.html',
    css: 'build/css/**/*.css',
    js: 'build/js/**/*.js',
    img: 'build/img/**/*.+(png|jpg|gif|svg|jpeg)',
    font: 'build/font',
};

/* BROWSER-SYNC */
gulp.task('sync', (done) => {
    sync.init({
        server: DEV_PATHS.base
    });

    done();
});

gulp.task('reload', (done) => {
    sync.reload();
    done();
});

/* CSS */
gulp.task('delete:css', (done) => {
    del.sync(DEV_PATHS.css);
    done();
});

gulp.task('sass', gulp.series('delete:css', () => {
    return gulp.src(DEV_PATHS.scss)
        .pipe(sass())
        .pipe(gulp.dest(DEV_PATHS.css));
}));

/* Build */
gulp.task('delete:build', (done) => {
    del.sync(PROD_PATHS.base);
    done();
});

gulp.task('build-html-css-js', () => {
    return gulp.src(DEV_PATHS.html)
        .pipe(concat())
        .pipe(gulpIf('*.js', uglifyJS()))
        .pipe(gulpIf('*.css', uglifyCSS()))
        .pipe(gulp.dest(PROD_PATHS.base));
})

gulp.task('build-img', () => {
    return gulp.src(DEV_PATHS.img)
        .pipe(gulp.dest(PROD_PATHS.base))
        .pipe(imagemin([
            //png
            imageminPngquant({
                speed: 1,
                quality: [0.95, 1] //lossy settings
            }),
            imageminZopfli({
                more: true
                // iterations: 50 // very slow but more effective
            }),
            //gif
            // imagemin.gifsicle({
            //     interlaced: true,
            //     optimizationLevel: 3
            // }),
            //gif very light lossy, use only one of gifsicle or Giflossy
            imageminGiflossy({
                optimizationLevel: 3,
                optimize: 3, //keep-empty: Preserve empty transparent frames
                lossy: 2
            }),
            //svg
            imagemin.svgo({
                plugins: [{
                    removeViewBox: false
                }]
            }),
            //jpg lossless
            imagemin.jpegtran({
                progressive: true
            }),
            //jpg very light lossy, use vs jpegtran
            imageminMozjpeg({
                quality: 40
            })
        ]))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(PROD_PATHS.base))
})

gulp.task('build-font', () => {
    return gulp.src(DEV_PATHS.font)
        .pipe(gulp.dest(PROD_PATHS.font));
})

gulp.task('build', gulp.series('delete:build', 'sass', 'build-html-css-js', 'build-img', 'build-font'));

/* Watch */
gulp.task('watch', gulp.series('sync', 'sass', () => {
    gulp.watch(DEV_PATHS.scss, gulp.series('sass'));
    gulp.watch([DEV_PATHS.css, DEV_PATHS.html, DEV_PATHS.js], gulp.series('reload'));
}));