const gulp = require('gulp');
const buildManifest = require('./helpers/manifest_builder_helper');

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
  return gulp.src(filesAndFoldersToCopy, { base: '.' }).pipe(gulp.dest('./build'));
});

gulp.task('build-manifest', buildManifest);

gulp.task('create-build', gulp.series('build-manifest', 'copy'));
