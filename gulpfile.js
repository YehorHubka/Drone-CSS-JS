const {src, dest, series, watch} = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const csso = require('gulp-csso')
const include = require('gulp-file-include')
const htmlmin = require('gulp-htmlmin')
const del = require('del')
const concat = require('gulp-concat')
const autoprefixer = require('gulp-autoprefixer')
const uglify = require('gulp-uglify-es').default
const sync = require('browser-sync').create()

function html() {
   return src('src/**.html')
      .pipe(include({
         prefix: '@@'
      }))
      .pipe(htmlmin({
         collapseWhitespace: true
      }))
      .pipe(dest('dist'))
}

function scss() {
   return src('src/scss/**.scss')
      .pipe(sass())
      .pipe(autoprefixer({
         overrideBrowserslist:  ['last 2 versions']
      }))
      .pipe(csso())
      .pipe(concat('main.css'))
      .pipe(dest('dist/css'))
}

function clear() {
   return del('dist')
}

function js() {
   return src([
      'src/js/**.js',
   ])
      .pipe(concat('common.js'))
      .pipe(uglify())
      .pipe(dest('./dist/js/'))
}

function serve(){
   sync.init({
      server: './dist'
   })

   watch('src/**.html', series(html)).on('change', sync.reload)
   watch('src/scss/**.scss', series(scss)).on('change', sync.reload)
   watch('src/js/**.js', series(js)).on('change', sync.reload)
}

exports.build = series(clear, scss, js, html)
exports.serve = series(clear, scss, js, html, serve)
exports.clear = clear