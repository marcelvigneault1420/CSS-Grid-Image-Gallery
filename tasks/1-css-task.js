var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');

const DEV_PATHS = {
    base: 'app',
    scss: 'app/scss/**/*.scss',
    css: 'app/css',
};

gulp.task('sass', () => {
    return gulp.src(DEV_PATHS.scss)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(DEV_PATHS.css));
});