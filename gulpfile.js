var gulp = require('gulp');
var sync = require('browser-sync');

var reqDir = require('require-dir');
var dir = reqDir('./tasks');

const DEV_PATHS = {
    base: 'app',
    html: 'app/**/*.html',
    scss: 'app/scss/**/*.scss',
    css: 'app/css',
    js: 'app/js/**/*.js',
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

/* Watch */
gulp.task('watch', gulp.series('sync', 'sass', () => {
    gulp.watch(DEV_PATHS.scss, gulp.series('sass'));
    gulp.watch([DEV_PATHS.css, DEV_PATHS.html, DEV_PATHS.js], gulp.series('reload'));
}));