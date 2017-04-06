var gulp = require('gulp')
var pug = require('gulp-pug')
var stylus = require('gulp-stylus')
var connect = require('gulp-connect')
var imagemin = require('gulp-imagemin');
var data = require('gulp-data');

gulp.task('pug', function() {
    gulp.src('./src/*.pug')
        .pipe(data(function() {
            return require('./projects.json')
        }))
        .pipe(pug())
        .pipe(gulp.dest('./out'))
        .pipe(connect.reload())
})

gulp.task('stylus', function() {
    gulp.src('./src/assets/styles/*.styl')
        .pipe(stylus())
        .pipe(gulp.dest('./out/assets/styles/'))
        .pipe(connect.reload())
})

gulp.task('imagemin', function() {
    gulp.src('src/assets/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('out/assets/img/'))
})

gulp.task('watch', function() {
    gulp.watch(['./src/*.pug','./src/partials/*.pug','./src/layouts/*.pug'],['pug'])
    gulp.watch(['./src/assets/styles/*.styl','./src/assets/styles/modules/*.styl'],['stylus'])
})

gulp.task('serve', function() {
    connect.server({
        root: './out',
        livereload: true
    })
})

gulp.task('build', ['pug','stylus','imagemin'])
gulp.task('server', ['serve','watch'])