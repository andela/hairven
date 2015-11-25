var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

// minify js files
gulp.task('scripts', function() {
  return gulp.src(['app/**/*.js', 'public/app/**/*.js'])
    .pipe(concat('main.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('build/js'));
});

// start app
gulp.task('nodemon', function () {
  nodemon({
    script: 'server.js',
    ext: 'js',
  });
});

gulp.task('default', ['scripts', 'nodemon']);