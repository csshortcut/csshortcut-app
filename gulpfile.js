const gulp = require('gulp')
const pug = require('gulp-pug')
const stylus = require('gulp-stylus')
const connect = require('gulp-connect')
const imagemin = require('gulp-imagemin');
const data = require('gulp-data');
const babel = require('gulp-babel');

gulp.task('pug', () => {
    gulp.src('./src/*.pug')
        .pipe(data(() => require('./projects.json')))
        .pipe(pug())
        .pipe(gulp.dest('./out'))
        .pipe(connect.reload())
})

gulp.task('stylus', () => {
    gulp.src('./src/assets/styles/*.styl')
        .pipe(stylus())
        .pipe(gulp.dest('./out/assets/styles/'))
        .pipe(connect.reload())
})

gulp.task('babel', () => {
    gulp.src('./src/assets/scripts/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('./out/assets/scripts/'))
        .pipe(connect.reload())
})

gulp.task('imagemin', () => {
    gulp.src('src/assets/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('out/assets/img/'))
})

gulp.task('watch', () => {
    gulp.watch(['./src/*.pug','./src/partials/*.pug','./src/layouts/*.pug'],['pug'])
    gulp.watch(['./src/assets/styles/*.styl','./src/assets/styles/modules/*.styl'],['stylus'])
    gulp.watch(['./src/assets/scripts/*.js'],['babel'])
})

gulp.task('serve', () => {
    connect.server({
        root: './out',
        livereload: true
    })
})

gulp.task('build', ['pug','stylus','imagemin', 'babel'])
gulp.task('server', ['serve','watch'])