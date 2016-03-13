var gulp = require('gulp'),
  sass = require('gulp-sass'),
  path = require('path'),
  runElectron = require('gulp-run-electron');

var releaseDir = 'release';
var releaseAppDir = path.join(releaseDir, 'app');

gulp.task('copy-assets', function() {
  return gulp.src('images/**/*')
    .pipe(gulp.dest(path.join(releaseAppDir, 'styles')));
});
gulp.task('sass', function() {
  return gulp
    .src('styles/**/*')
    .pipe(sass())
    .pipe(gulp.dest(path.join(releaseAppDir, 'styles')));
});

gulp.task('copy-bootstrap', function() {
  return gulp
    .src('node_modules/bootstrap/**/*')
    .pipe(gulp.dest(path.join(releaseAppDir, 'node_modules', 'bootstrap')));
});

gulp.task('copy-jquery', function() {
  return gulp
    .src('node_modules/jquery/**/*')
    .pipe(gulp.dest(path.join(releaseAppDir, 'node_modules', 'jquery')));
});

gulp.task('copy-material-icons', function() {
  return gulp
    .src('node_modules/material-design-icons/iconfont/*')
    .pipe(gulp.dest(path.join(releaseAppDir, 'node_modules', 'material-design-icons')));
});

gulp.task('copy-app', function() {
  return gulp
    .src('app/**/*')
    .pipe(gulp.dest(releaseAppDir));
});

gulp.task('start-electron', function() {
  return gulp.src('app')
    .pipe(runElectron(['./release/app/main.js']));
});

gulp.watch('app/*', [runElectron.rerun]);
gulp.watch('styles/*', [runElectron.rerun]);
gulp.task('build', ['copy-app', 'copy-assets', 'sass', 'copy-bootstrap', 'copy-jquery', 'copy-material-icons']);
gulp.task('default', ['build', 'start-electron']);