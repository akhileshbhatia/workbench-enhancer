const gulp = require('gulp');
gulp.task('copy', () => {
  return gulp.src(['./fonts/**']).pipe(gulp.dest('./build'));
});