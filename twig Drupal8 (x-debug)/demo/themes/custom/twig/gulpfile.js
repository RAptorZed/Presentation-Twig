//*-----instruction-----*//

//gulp js - minimize JavaScript file;
//gulp sass - compile sass code to css, and minimize them;
//gulp img - optimize image in project;
//$gulp watch - help see all changes in project (sass, css, js, yml), and automatically run commands (sass, js, img), +livereload;
//$gulp run - run all commands in project;


//*-----add new plugins-----*//

//- go to http://gulpjs.com/plugins/
//in terminal run:
//  npm install [you plugin name] --save-dev
//check in package.json
//install in gulpfile.js (pipe, gulp.task)


var gulp = require('gulp'),
    livereload = require('gulp-livereload'),
    uglify = require('gulp-uglifyjs'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    imagemin = require('gulp-imagemin'),
    sassGlob = require('gulp-sass-glob'),
    pngquant = require('imagemin-pngquant');

gulp.task('img', function () {
    return gulp.src('./sources/images/**/*.*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant('')]
        }))
        .pipe(gulp.dest('./assets/images'));
});

gulp.task('sass', function () {
  gulp.src('./sources/sass/**/*.scss')
    .pipe(sassGlob())
//    .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
//    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./assets/css'));
});

gulp.task('js', function() {
  gulp.src('./sources/lib/*.js')
    .pipe(uglify(''))
    .pipe(gulp.dest('./assets/js'))
});

gulp.task('watch', function(){
    livereload.listen();
    gulp.watch('sources/sass/**/*.scss', ['sass']);
    gulp.watch('sources/lib/*.js', ['js']);
    gulp.watch('sources/images/**/*.*', ['img']);
    gulp.watch(['assets/css/style.css', 'templates/**/*.twig', 'assets/js/*.js', 'assets/image/*.*'], function (files){
        livereload.changed(files)
    });
});

gulp.task('run', ['watch', 'js', 'sass', 'img']);


