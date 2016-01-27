var gulp = require('gulp'),
    path = require('path'),
    runElectron = require('gulp-run-electron')

var releaseDir = 'release'
var releaseAppDir = path.join(releaseDir, 'app')

gulp.task('copy-styles', function() {
  return gulp
    .src('styles/**/*')
    .pipe(gulp.dest(path.join(releaseAppDir, 'styles')))
})

gulp.task('copy-bootstrap', function() {
  return gulp
    .src('node_modules/bootstrap/**/*')
    .pipe(gulp.dest(path.join(releaseAppDir, 'node_modules', 'bootstrap')))
})

gulp.task('copy-jquery', function() {
  return gulp
    .src('node_modules/jquery/**/*')
    .pipe(gulp.dest(path.join(releaseAppDir, 'node_modules', 'jquery')))
})

gulp.task('copy-material-icons', function() {
  return gulp
    .src('node_modules/material-design-icons/iconfont/*')
    .pipe(gulp.dest(path.join(releaseAppDir, 'node_modules', 'material-design-icons')))
})

gulp.task('copy-app', function() {
  return gulp
    .src('app/**/*')
    .pipe(gulp.dest(releaseAppDir))
})

gulp.task('start-electron', function() {
  return gulp.src('app')
    .pipe(runElectron(['./release/app/main.js']))
})

gulp.watch("app/*", [runElectron.rerun])
gulp.task('build', ['copy-app', 'copy-styles', 'copy-bootstrap', 'copy-jquery', 'copy-material-icons'])
gulp.task('default', ['build', 'start-electron'])