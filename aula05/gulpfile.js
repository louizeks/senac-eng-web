var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    minifyCSS   = require('gulp-minify-css'),
    plumber     = require('gulp-plumber'),
    livereload  = require('gulp-livereload'),
    connect     = require('gulp-connect'),
    minifyjs    = require("gulp-uglify"),
    htmlmin     = require('gulp-htmlmin'),
    imagemin    = require('gulp-imagemin');

livereload({start:true})
    
gulp.task('connect', function(done){
  connect.server({
    root:'/',
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
    .pipe(gulp.dest('./css'))
    .pipe(livereload());    
});

gulp.task('js', function () {
  return gulp.src('./js/*.js')  
  .pipe(connect.reload()) 
  .pipe(minifyjs())
  .pipe(plumber())        
  .pipe(gulp.dest('./js-min'))
  .pipe(livereload());    
});

gulp.task('html', function () {
  return gulp.src('*.html')    
    .pipe(connect.reload())    
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(plumber())        
    .pipe(gulp.dest('./html-min/'));      
});

gulp.task('images', function () {    
  return gulp.src('src/images/*')
    .pipe(connect.reload())
    .pipe(imagemin())
    .pipe(plumber())        
    .pipe(gulp.dest('dist/images'));    
});

gulp.task('watch', function () {    
  livereload.listen();
  gulp.watch('./sass/**/*.scss', gulp.series('sass'));  
  gulp.watch('./js/*.js', gulp.series('js'));  
  gulp.watch('*.html', gulp.series('html'));      
  gulp.watch('./src/images/*', gulp.series('images'));   
});

gulp.task('default', gulp.series('connect','sass','js','html','images','watch'));
