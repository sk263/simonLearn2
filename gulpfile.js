var gulp = require('gulp'),
    sass = require('gulp-sass'),
    plumber = require('gulp-plumber'),
    prefix = require('gulp-autoprefixer'),
    concat = require ('gulp-concat'),
    browserSync = require('browser-sync'),
    nunjucksRender = require('gulp-nunjucks-render'),
    uglify = require('gulp-uglify'),
    pump = require('pump'),
    rename = require('gulp-rename');

var jsPaths = [
  'node_modules/jquery/dist/jquery.js',
  'node_modules/bootstrap/node_modules/tether/dist/js/tether.js',
  'node_modules/bootstrap/dist/js/bootstrap.js',
  'js/app/**/*.js'
];

var cssPaths = [
  'node_modules/normalize.css/normalize.css',
  'css/app.css'
];

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
  gulp.src("./scss/app/app.scss")
  .pipe(plumber())
  .pipe(sass())
  .pipe(prefix('last 3 versions'))
  .pipe(gulp.dest("./css/"))
  gulp.src(cssPaths)
  .pipe(concat('app.css'))
  .pipe(gulp.dest('css/build/'))
  .pipe(browserSync.stream());
});

//HTML build
gulp.task('build', function () {
  return gulp.src('html/pages/**/*.html')
  .pipe(nunjucksRender({
    path: 'html/'
  }))
  .pipe(gulp.dest('html-build/'))
  .pipe(browserSync.stream());
});


//ConcatJS
gulp.task('concatJS' , function(){
  return gulp.src(jsPaths)
  .pipe(concat('main.js'))
  .pipe(gulp.dest('js/build/'));
});



//Compress
gulp.task('compress', function (cb) {
  pump([
    gulp.src('js/build/main.js'),
    uglify('main.min.js'),
    rename({ suffix: '.min' }),
    gulp.dest('js/build/')
    ],
    cb
    );
});

// Static Server + watching scss/html files
gulp.task('serve', ['sass' , 'build'], function() {

  browserSync.init({
    server: "./",
    index: "./html-build/index.html"
  });

  gulp.watch("scss/app/**/*.scss", ['sass']);
  gulp.watch("html/**/*.html", ['build']);
  gulp.watch("js/app/**/*.js", ['concatJS' , 'compress']);
});

gulp.task('default', ['serve' , 'concatJS' , 'compress']);

