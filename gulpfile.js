var gulp = require('gulp'),
  browserSync = require('browser-sync').create(),
  $ = require('gulp-load-plugins')(),
  sort = require('postcss-sorting'),
  autoprefixer = require('autoprefixer');

gulp.task('serve', [
  'sass', 'uncss'
], function() {

  browserSync.init({server: "./app"});

  gulp.watch("app/sass/*.sass", ['sass']);
  gulp
    .watch("app/*.html")
    .on('change', browserSync.reload);
});

gulp.task('sass', function() {
  var postCSSProcessors = [
    autoprefixer({browsers: ['last 3 versions']}),
    sort
  ];
  return gulp
    .src("app/sass/*.sass")
    .pipe($.sass({outputStyle: 'expanded'}).on('error', $.sass.logError))
    .pipe($.postcss(postCSSProcessors))
    .pipe(gulp.dest("app/css"))
    .pipe(browserSync.stream());
});

gulp.task('uncss', ['sass'], function() {
  return gulp
    .src('./app/css/app.css')
    .pipe($.uncss({html: ['./**/index.html']}))
    .pipe($.rename('dist.css'))
    .pipe(gulp.dest('app/dist'));
});

gulp.task('default', ['serve']);
gulp.task('build', ['sass', 'uncss']);
