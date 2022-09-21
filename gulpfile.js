const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();
const plumber= require('gulp-plumber');
const postcss = require('gulp-postcss');
const htmlmin = require('gulp-htmlmin');
const del = require('del');
const csso= require('postcss-csso');
const autoprefixer = require('autoprefixer');
const sourcemap = require('gulp-sourcemaps');
const webp = require('gulp-webp');
const terser = require('gulp-terser');
const squoosh = require('gulp-libsquoosh');

//Html
const html = ()=> {
    return gulp.src('docs/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('build'));
}


//Scripts
const scripts = ()=> {
    return gulp.src('docs/js/main.js')
        .pipe(terser())
        .pipe(rename('main.min.js'))
        .pipe(gulp.dest('build/js'))
        .pipe(browserSync.stream());
}
exports.scripts = scripts;

//Styles
const styles = ()=> {
    return gulp.src('docs/sass/style.scss')
        .pipe(plumber())
        .pipe(sourcemap.init())
        .pipe(sass())
        .pipe(postcss([autoprefixer(), csso()]))
        .pipe(rename('style.min.css'))
        .pipe(sourcemap.write("."))
        .pipe(gulp.dest("build/css"))
        .pipe(browserSync.stream());
}
exports.styles = styles;

// Images
const optimizeImages = () => {
    return gulp.src("docs/img/**/*.{png,jpg,svg}")
        .pipe(squoosh())
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
        "docs/img/**/*.svg"
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
    gulp.watch("docs/*.html", gulp.series(html, reload));
}

const build = gulp.series(
    clean,
    copy,
    optimizeImages,
    gulp.parallel(
        styles,
        scripts,
        html,
        createWebp
    ),
);

exports.build = build;

// Default

exports.default = gulp.series(
    clean,
    copy,
    copyImages,
    gulp.parallel(
        styles,
        html,
        scripts,
        createWebp
    ),
    gulp.series(
        server,
        watcher
    ));

