const projectConstants = Object.freeze({
    buildFolderName: 'build',
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