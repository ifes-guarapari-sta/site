const { task, src, dest, series, parallel } = require("gulp");
const csso = require("gulp-csso");
const htmlmin = require("gulp-htmlmin");
const rename = require("gulp-rename");

/**
 * 
 * Task of build from library and generate public files.
 * 
 */
task("lib/material-design", () => {
  return src("node_modules/material-design-icons/iconfont/material-icons.css")
    .pipe(csso())
    .pipe(rename("material-icons.min.css"))
    .pipe(dest("public/lib/material-design-icons/iconfont/"));
});
task("lib/material-design-icons", () => {
  return src(["node_modules/material-design-icons/iconfont/MaterialIcons-Regular.eot",
    "node_modules/material-design-icons/iconfont/MaterialIcons-Regular.ijmap",
    "node_modules/material-design-icons/iconfont/MaterialIcons-Regular.svg",
    "node_modules/material-design-icons/iconfont/MaterialIcons-Regular.ttf",
    "node_modules/material-design-icons/iconfont/MaterialIcons-Regular.woff",
    "node_modules/material-design-icons/iconfont/MaterialIcons-Regular.woff2"])
    .pipe(dest("public/lib/material-design-icons/iconfont/"));
});
task("lib/material-design-lite", () => {
  return src(["node_modules/material-design-lite/dist/material.min.js",
    "node_modules/material-design-lite/dist/material.min.js.map",
    "node_modules/material-design-lite/dist/material.indigo-pink.min.css"])
    .pipe(dest("public/lib/material-design-lite/dist/"));
});

/**
 * 
 * Task of copy and paste images public files.
 * 
 */
task("icon", function () {
  return src("images/favicon.ico")
    .pipe(dest("public/"));
});
task("images", () => {
  return src("images/**/*.*")
    .pipe(dest("public/images/"));
});

/**
 * 
 * Task of build from source and generate html public files.
 * 
 */
task("html", () => {
  return src("src/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest("public/"));
});
task("html/2019", () => {
  return src("src/2019/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest("public/2019/"));
});
task("html/2021", () => {
  return src("src/2021/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest("public/2021/"));
});

/**
 * 
 * Default task.
 * 
 */
task("default", series(parallel("lib/material-design", "lib/material-design-icons", "lib/material-design-lite"), parallel("icon", "images"), parallel("html", "html/2019", "html/2021")));