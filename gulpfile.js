const { src, dest, series, watch } = require(`gulp`),
    CSSLinter = require(`gulp-stylelint`),
    babel = require(`gulp-babel`),
    htmlCompressor = require(`gulp-htmlmin`),
    cssCompressor = require(`gulp-clean-css`),
    jsCompressor = require(`gulp-uglify`),
    jsLinter = require(`gulp-eslint`),
    browserSync = require(`browser-sync`),
    reload = browserSync.reload;

let lintCSS = () => {
    return src([`styles/main.css`])
        .pipe(CSSLinter({
            failAfterError: false,
            reporters: [
                {formatter: `string`, console: true}
            ]
        }));
};

exports.lintCSS = lintCSS;

let lintJS = () => {
    return src([`js/main.js`, `gulpfile.js`])
        .pipe(jsLinter())
        .pipe(jsLinter.formatEach(`compact`));
};

exports.lintJS = lintJS;

let compressHTML = () => {
    return src([`index.html`])
        .pipe(htmlCompressor({collapseWhitespace: true}))
        .pipe(dest(`prod`));
};

exports.compressHTML = compressHTML;

let compressCSS = () => {
    return src(`styles/main.css`)
        .pipe(cssCompressor({compatibility: `ie8`}))
        .pipe(dest(`prod/css`));
};

exports.compressCSS = compressCSS;

let transpileJSForDev = () => {
    return src(`js/main.js`)
        .pipe(babel())
        .pipe(dest(`temp/js`));
};

exports.transpileJSForDev = transpileJSForDev;

let transpileJSForProd = () => {
    return src(`js/main.js`)
        .pipe(babel())
        .pipe(jsCompressor())
        .pipe(dest(`prod/js`));
};

exports.transpileJSForProd = transpileJSForProd;

let serve = () => {
    browserSync({
        notify: true,
        reloadDelay: 50,
        browser: browserChoice,
        server: {
            baseDir: [
                `temp`,
                `.`,
                `prod`,
            ]
        }
    });
};

watch(`js/main.js`, series(lintJS, transpileJSForDev))
    .on(`change`, reload);

watch(`style/main.css`, series(lintCSS))
    .on(`change`, reload);

let browserChoice = `default`;

async function chrome () {
    browserChoice = `google chrome`;
}

exports.chrome = series(chrome, serve);

exports.serve = series(
    lintCSS,
    lintJS,
    transpileJSForDev,
    serve
);

exports.build = series(
    compressHTML,
    compressCSS,
    transpileJSForProd
);

exports.default = serve;