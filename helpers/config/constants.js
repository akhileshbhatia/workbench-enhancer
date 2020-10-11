const projectConstants = Object.freeze({
  buildFolderName: 'dist',
  ignoreFileNames: ['login.js', 'init.js'],
  filesAndFoldersToCopy: [
    'fonts/**',
    'icons/**',
    'js/**',
    'scripts/**',
    'styles/**',
    'views/**',
    'background.js',
    'LICENSE',
    'README.md'
  ]
});

module.exports = projectConstants;
