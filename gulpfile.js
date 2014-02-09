var gulp   = require('gulp');
var gutil  = require('gulp-util');
var coffee = require('gulp-coffee');
var concat = require('gulp-concat');

gulp.task('coffee', function() {
  gulp.src('./src/*.coffee')
    .pipe(coffee({bare: true})
    .on('error', gutil.log))
    .pipe(gulp.dest('./compiled/'))
});

gulp.task('concat', ['coffee'], function(){
  gulp.src(['./compiled/*.js'])
    .pipe(gulp.dest('./public/'))
});

gulp.task('default', ['concat'], function(){
  // place code for your default task here
});

gulp.watch('./src/*.coffee', ['default'])
