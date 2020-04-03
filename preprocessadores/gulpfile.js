var gulp = require('gulp'),
    sass = require('gulp-sass'),
    minifyCSS = require('gulp-minify-css'),
    plumber = require('gulp-plumber'),
    livereload = require('gulp-livereload'),
    connect = require('gulp-connect');

livereload({start:true})
    
gulp.task('connect', function(done){
  connect.server({
    livereload:true         
  });
  done();
});

sass.compiler = require('node-sass');
 
gulp.task('sass', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(connect.reload())
    .pipe(sass().on('error', sass.logError))
    .pipe(minifyCSS())
    .pipe(plumber())    
    .pipe(livereload()
    .pipe(gulp.dest('./css')));    
});
 
gulp.task('watch', function () {
  livereload.listen();
  gulp.watch('./sass/**/*.scss', gulp.series('sass'));  
});

gulp.task('default', gulp.series('connect','sass','watch'));