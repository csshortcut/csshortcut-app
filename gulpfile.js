var gulp = require('gulp')
var pug = require('gulp-pug')
var stylus = require('gulp-stylus')

gulp.task('pug', function() {
    gulp.src('./src/*.pug')
        .pipe(pug())
        .pipe(gulp.dest('./out'))
})

gulp.task('stylus', function() {
    gulp.src('./src/assets/styles/*.styl')
        .pipe(stylus())
        .pipe(gulp.dest('./out/assets/styles/'))
})

gulp.task('watch', function() {
    gulp.watch(['./src/*.pug'],['pug'])
    gulp.watch(['./src/assets/styles/*.styl'],['stylus'])
})

gulp.task('build', ['pug','stylus'])