const gulp = require('gulp');
const buildManifest = require('./helpers/manifest_builder_helper');
const projectConstants = require('./helpers/config/constants');

gulp.task('copy', () => {
  return gulp.src(projectConstants.filesAndFoldersToCopy, { base: '.' })
    .pipe(gulp.dest(`./${projectConstants.buildFolderName}`));
});

gulp.task('build-manifest', buildManifest);

gulp.task('default', gulp.series('copy', 'build-manifest'));
