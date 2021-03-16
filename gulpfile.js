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
   .pipe(dest("public/2019/lib/material-design-icons/iconfont/"));
});
task("lib/material-design-icons", () => {
  return src(["node_modules/material-design-icons/iconfont/MaterialIcons-Regular.eot",
              "node_modules/material-design-icons/iconfont/MaterialIcons-Regular.ijmap",
              "node_modules/material-design-icons/iconfont/MaterialIcons-Regular.svg",
              "node_modules/material-design-icons/iconfont/MaterialIcons-Regular.ttf",
              "node_modules/material-design-icons/iconfont/MaterialIcons-Regular.woff",
              "node_modules/material-design-icons/iconfont/MaterialIcons-Regular.woff2"])
   .pipe(dest("public/2019/lib/material-design-icons/iconfont/"));
});
task("lib/material-design-lite", () => {
  return src(["node_modules/material-design-lite/dist/material.min.js",
              "node_modules/material-design-lite/dist/material.min.js.map",
              "node_modules/material-design-lite/dist/material.indigo-pink.min.css"])
   .pipe(dest("public/2019/lib/material-design-lite/dist/"));
});

/**
 * 
 * Task of copy and paste images public files.
 * 
 */
task("images", () => {
  return src("src/images/*.*")
   .pipe(dest("public/images/"));
});

/**
 * 
 * Task of build from source and generate html public files.
 * 
 */
task("html", () => {
 return src("src/2019/*.html")
  .pipe(htmlmin({collapseWhitespace: true}))
  .pipe(dest("public/2019/"));
});

/**
 * 
 * Task of build from source and generate index public file.
 * 
 */
task("index", () => {
 return src("src/index.html")
  .pipe(htmlmin({collapseWhitespace: true}))
  .pipe(dest("public/"));
});

/**
 * 
 * Default task.
 * 
 */
task("default", series(parallel("lib/material-design","lib/material-design-icons","lib/material-design-lite"), "images", "html", "index"));