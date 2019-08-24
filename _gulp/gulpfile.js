var gulp      = require('gulp');
var uglify    = require('gulp-uglify');
var stripDebug    = require('gulp-strip-debug'); // console alert
var concat    = require('gulp-concat');
var compass   =  require('gulp-compass');
var minifyCSS = require('gulp-minify-css');
var plumber   = require('gulp-plumber');
var source = require('vinyl-source-stream');// bundle の返したファイルストリームを vinyl に変換
var babelify = require('babelify');
var browserify = require('browserify');
const path = require('path');
const browserSync = require("browser-sync");
var notify = require('gulp-notify');
const vueify = require('vueify');
const buffer = require('vinyl-buffer');



//babel、es2015、reactの連携
//http://sota1235.hatenablog.com/entry/2015/11/07/132832
//http://mgi.hatenablog.com/entry/2015/11/01/135222

//それぞれのJSファイルを結合
gulp.task('concat_libs', function() {

  gulp.src([
    './_js/libs/jquery.js',
    './_js/libs/exif.js',
    './_js/libs/megapix-image.js',
    './_js/libs/leaflet.js',
    './_js/libs/dom-to-image.min.js',
    './_js/libs/html2canvas.min.js',
    './_js/libs/pixi.js',
    './_js/libs/pixi-filters.js',
    './_js/libs/GIFEncoder.js',
    './_js/libs/LZWEncoder.js',
    './_js/libs/NeuQuant.js',
    './_js/libs/moveTo.min.js',
    './_js/libs/customevent-polyfill.js'
    ])
    .pipe(plumber())
    .pipe(concat("libs.js"))
    //.pipe(uglify())
    .pipe(gulp.dest('../mappop/app/assets/javascripts'));

});


// gulp.task('concat', function() {

//     var jsFiles = [
//             'Main.js',
//             'Common.js',
//         ];
//     jsFiles.forEach(function(fileName) {
//         browserify({
//                 entries: "./_js/" + fileName,
//                 extensions: [".js"]
//             })
//             .transform(babelify, {presets: ['es2015']})
//             .bundle()
//             .on("error", function (err) {
//                 console.log("Error : " + err.message);
//                 this.emit("end");
//             })
//             .pipe(source( fileName ))
//             .pipe(gulp.dest( '../mappop/app/assets/javascripts' ))
//             .pipe(notify('jsコンパイル完了'));
//     });
// });

let jsEntities = {
    src: '_vue',
    dest: '../mappop/public/js',
    files: [
      'app.js'
    ]
};

var envify = require('envify/custom');
gulp.task('vue', () => {
    jsEntities.files.forEach(entry => {
        browserify(path.join(jsEntities.src, entry), {
            debug: true,
            extensions: ['.js', '.vue'],
            transform: [
                [vueify, {
                    sass: {
                        // includePaths: ["./src/sass/import/_vars.scss"]
                    }
                }],
                babelify.configure({ 'presets': ['es2015'] })
            ],
        })
        .transform(
            { global: true },
            envify({ NODE_ENV: 'production' })
        )
        .bundle()
        .on('error', err => {
            console.log(err.message);
            console.log(err.stack);
        })
        .pipe(source(entry))
        .pipe(buffer())
        .pipe(gulp.dest(jsEntities.dest))
        .pipe(browserSync.reload({stream:true}));
    });

    // gulp.src( jsEntities.src + '/**/*.vue' )
    //     .pipe(vueify())
    //     .pipe( gulp.dest( jsEntities.dest ) );
});


//Sassファイル(Compass)をコンパイル
gulp.task('compass', function() {
    gulp.src([
        '_scss/**/*.scss'  //ディレクトリを保持したまま書き出し
    ])
    .pipe(plumber())
    .pipe(compass({
        config_file: '_scss/config.rb',
        css : '../mappop/app/assets/stylesheets',
        sass: '_scss',
        comments: false
    }))
    //.pipe(minifyCSS())
    .pipe(gulp.dest('../mappop/app/assets/stylesheets'))
    .pipe(notify('Sassコンパイル完了'));
});



// デフォルトタスク
gulp.task('default', function() {

    //JSファイルの変更を監視
    gulp.watch('_js/**/*.js', function(event) {
        gulp.run('concat_libs');
    });

    // gulp.watch('_js/**/*.js', function(event) {
    //     gulp.run('concat');
    // });

    //Sassファイルの変更を監視
    gulp.watch('_scss/**', function(event) {
        gulp.run('compass');
    });

    //vue
    gulp.watch(path.join(jsEntities.src, '**/*.*'), ['vue']);

});