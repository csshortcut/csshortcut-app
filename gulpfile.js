const { series, parallel, src, dest, watch } = require('gulp')
const pugPlugin = require('gulp-pug')
const stylusPlugin = require('gulp-stylus')
const connect = require('gulp-connect')
const imageminPlugin = require('gulp-imagemin')
const data = require('gulp-data')
const babelPlugin = require('gulp-babel')
const eslint = require('gulp-eslint')
const stylint = require('gulp-stylint')

const pug = done => {

    fetch('https://api.github.com/users/afonsopacifer/repos')
        .then(res => res.json())
        .then(repos => {

            src('./src/*.pug')
                .pipe(data(function() { return { projects: repos } }))
                .pipe(pugPlugin())
                .pipe(dest('./out'))
                .pipe(connect.reload())

            done();
    
        })
}

const stylus = () => src('./src/assets/styles/*.styl')
    .pipe(stylusPlugin())
    .pipe(dest('./out/assets/styles/'))
    .pipe(connect.reload())

const stylusLint = () => src(['./src/assets/styles/*.styl', './src/assets/styles/modules/*.styl'])
    .pipe(stylint())
    .pipe(stylint.reporter())

const babel = () => src('./src/assets/scripts/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(babelPlugin({
        presets: ['@babel/env']
    }))
    .pipe(dest('./out/assets/scripts/'))
    .pipe(connect.reload());

const imagemin = () => src('./src/assets/img/*', {encoding: false})
    .pipe(imageminPlugin())
    .pipe(dest('./out/assets/img/'))

const watchTask = () => {
    watch(['./src/*.pug','./src/partials/*.pug','./src/layouts/*.pug'], pug)
    watch(['./src/assets/styles/*.styl', './src/assets/styles/modules/*.styl'], stylus)
}

const serve = () => {
    connect.server({
        root: 'out/',
        livereload: true
    })
}

exports.server = parallel(watchTask, serve)
exports.build = series(pug, stylus, imagemin, babel, stylusLint)