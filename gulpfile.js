const gulp = require('gulp');
const sass = require('gulp-sass');
const browsersync = require('browser-sync').create();

// BrowserSync
function browserSync(done) {
	browsersync.init({
		server: {
			baseDir: './'
		}
	});
	done();
}

// BrowserSync Reload
function browserSyncReload(done) {
	browsersync.reload();
	done();
}

// CSS task
function css() {
	return gulp
		.src('./assets/sass/**/*.scss')
		.pipe(sass({ outputStyle: 'expanded' }))
		.pipe(gulp.dest('./assets/css/'))
		.pipe(browsersync.stream());
}

// Watch files
function watchFiles() {
	gulp.watch('./assets/sass/**/*', css);
	gulp.watch([ './index.html' ], gulp.series(browserSyncReload));
}

const watch = gulp.parallel(watchFiles, browserSync);

exports.css = css;
exports.watch = watch;
exports.default = watch;
