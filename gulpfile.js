const gulp = require('gulp');
const plumber= require('gulp-plumber');
const sourcemap = require('gulp-sourcemaps');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const csso= require('postcss-csso');
const rename = require('gulp-rename');
const htmlmin = require('gulp-htmlmin');
const terser = require('gulp-terser');
const imagemin = require("gulp-imagemin");
const webp = require('gulp-webp');
const svgstore = require("gulp-svgstore");
const del = require('del');
const browserSync = require('browser-sync').create();
const fileinclude = require('gulp-file-include');

//Styles

const styles = () => {
    return gulp.src('docs/sass/style.scss')
        .pipe(plumber())
        .pipe(sourcemap.init())
        .pipe(sass())
        .pipe(postcss([
            autoprefixer(),
            csso()
        ]))
        .pipe(rename('style.min.css'))
        .pipe(sourcemap.write("."))
        .pipe(gulp.dest("build/css"))
        .pipe(browserSync.stream());
}
exports.styles = styles;

//Html

// const html = () => {
//     return gulp.src('docs/*.html')
//         .pipe(htmlmin({ collapseWhitespace: true }))
//         .pipe(gulp.dest('build'));
// }
//
// exports.html = html;

const fileInclude = (done)=> {
    gulp.src('docs/*.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file',

        }))
        .pipe(gulp.dest('build/'));
    done();
};

exports.fileInclude = fileInclude;

//Scripts

const scripts = () => {
    return gulp.src('docs/js/main.js')
        .pipe(terser())
        .pipe(rename('main.min.js'))
        .pipe(gulp.dest('build/js'))
        .pipe(browserSync.stream());
}
exports.scripts = scripts;

// Images

const optimizeImages = () => {
    return gulp.src("docs/img/**/*.{png,jpg,svg}")
        .pipe(imagemin([
            imagemin.mozjpeg({ progressive: true }),
            imagemin.optipng({ optimizationLevel: 3 }),
            imagemin.svgo()
        ]))
        .pipe(gulp.dest("build/img"))
}

exports.optimizeImages = optimizeImages;

const copyImages = () => {
    return gulp.src("docs/img/**/*.{png,jpg,svg}")
        .pipe(gulp.dest("build/img"))
}
exports.copyImages = copyImages;

// WebP
const createWebp = () => {
    return gulp.src("docs/img/**/*.{jpg,png}")
        .pipe(webp({ quality: 90 }))
        .pipe(gulp.dest("build/img"))
}

exports.createWebp = createWebp;

// Copy

const copy = (done) => {
    gulp.src([
        "docs/fonts/*.{woff2,woff}",
        "docs/*.ico",
        "docs/img/**/*.svg",
        'docs/downloads/*.pdf'
    ], {
        base: "docs"
    })
        .pipe(gulp.dest("build"))
    done();
}

exports.copy = copy;

// Clean

const clean = () => {
    return del('build');
};

// Static server
const server = (done)=> {
    browserSync.init({
        server: {
            baseDir: "build"
        },
        cors: true,
        notify: false,
        ui: false,
    });
    done();
};
exports.server = server;

// Reload

const reload = (done) => {
    browserSync.reload();
    done();
}

// Watcher

const watcher = () => {
    gulp.watch("docs/sass/**/*.scss", gulp.series(styles));
    gulp.watch("docs/js/main.js", gulp.series(scripts));
    gulp.watch("docs/**/*.html", gulp.series(fileInclude, reload));
}

const build = gulp.series(
    clean,
    copy,
    optimizeImages,
    fileInclude,
    gulp.parallel(
        styles,
        scripts,
        createWebp
    ),
);

exports.build = build;

// Default

exports.default = gulp.series(
    clean,
    copy,
    copyImages,
    fileInclude,
    gulp.parallel(
        styles,

        scripts,
        createWebp
    ),
    gulp.series(
        server,
        watcher
    ));

