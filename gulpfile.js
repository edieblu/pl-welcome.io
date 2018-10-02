const browserSync = require("browser-sync");
const reload = browserSync.reload;
const gulp = require("gulp");
const sass = require("gulp-sass");

// Browser-sync task, only cares about compiled CSS
gulp.task("browser-sync", function() {
  browserSync({
    server: {
      baseDir: "./"
    }
  });
});

// Sass task, will run when any SCSS files change & BrowserSync
// will auto-update browsers
gulp.task("sass", function() {
  return gulp
    .src("scss/**/*.scss")
    .pipe(sass())
    .pipe(gulp.dest("css"))
    .pipe(reload({ stream: true }));
});

// Reload all Browsers
gulp.task("bs-reload", function() {
  browserSync.reload();
});

// Default task to be run with `gulp`
// This default task will run BrowserSync & then use Gulp to watch files.
// When a file is changed, an event is emitted to BrowserSync with the filepath.
gulp.task("default", ["browser-sync"], function() {
  gulp.watch("css/*.css", function(file) {
    if (file.type === "changed") {
      reload(file.path);
    }
  });
  gulp.watch("*.html", ["bs-reload"]);
});
