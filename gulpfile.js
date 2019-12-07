const gulp = require('gulp');
const filesAndFoldersToCopy = [
  'fonts/**',
  'icons/**',
  'js/**',
  'scripts/**',
  'styles/**',
  'views/**',
  'background.js',
  'LICENSE',
  'manifest.json',
  'README.md'
]
gulp.task('copy', () => {
  return gulp.src(filesAndFoldersToCopy, {base: '.'}).pipe(gulp.dest('./build'));
});