var gulp = require('gulp');
var gutil = require('gulp-util');
var coffee = require('gulp-coffee');
var concat = require('gulp-concat');

gulp.task('coffee', function() {
  gulp.src('./src/*.coffee')
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(gulp.dest('./compiled/'))
});

gulp.task('concat', function(){
  gulp.src(['./lib/pixi.dev.js', './compiled/*.js'])
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./public/'))
});

gulp.task('default', function(){
  // place code for your default task here
  gulp.run('coffee')
  gulp.run('concat')
});
