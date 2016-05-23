var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
// Serve
gulp.task('serve', function () {
  browserSync.init({
    server: './app',
    open: true,
    notify: false
  });

  gulp.watch('scss/**/*.scss', ['sass']);
  gulp.watch([
    'app/**/*.html',
    'app/js/**/*.js',
    'app/api/**/*.json',
    'app/img/**/*.{png|gif|jpg|jpeg}',
    'app/fonts/iconfont.{svg|ttf}']).on('change', browserSync.reload);
});

gulp.task('sass', function () {
  return gulp.src('scss/app.scss')
  //  .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
  //  .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest("app/css"))
    .pipe(reload({stream: true}));
});

gulp.task('default', ['serve', 'sass']);
