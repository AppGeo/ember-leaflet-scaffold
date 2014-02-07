var // modules
  config = require('./config'),
  path = require('path'),
  gulp = require('gulp'),
  util = require('gulp-util'),
  concat = require('gulp-concat'),
  less = require('gulp-less'),
  refresh = require('gulp-livereload'),
  handlebars = require('gulp-ember-handlebars');

gulp.task('templates', function(){
  gulp.src([config.client + 'templates/**/*.hbs'])
    .pipe(handlebars({
      outputType: 'browser'
    }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest(config.dist + 'scripts'))
    .pipe(refresh(config.livereloadPort));
});

gulp.task('less', function () {
  gulp.src(config.client + 'styles/*.less')
    .pipe(less({
      paths: [
        path.join(__dirname, 'client', 'styles')
      ]
    }))
    .pipe(gulp.dest(config.dist + 'styles'))
    .pipe(refresh(config.livereloadPort));
});

gulp.task('concat', function () {
  gulp.src(config.client + '**/*.js')
    .pipe(concat('application.js'))
    .pipe(gulp.dest(config.dist + 'scripts'))
    .pipe(refresh(config.livereloadPort));
});

gulp.task('livereload', function () {
  refresh(config.livereloadPort);
});

gulp.task('watch', function () {
  gulp.watch(config.client + 'styles/*.less', ['less']);
  gulp.watch(config.client + 'templates/*.hbs', ['templates']);
  gulp.watch(config.client + '**/*.js', ['concat']);
});

gulp.task('default', ['less', 'templates', 'concat', 'watch']);
