var gulp = require('gulp');
var webserver = require('gulp-webserver');

gulp.task('serve', function() {
  gulp.src('www')
    .pipe(webserver({
      host: "0.0.0.0",
      port: 3000,
      livereload: true
    }));
});
