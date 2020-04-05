const glob = require('glob');
const manifest = require('./config/manifest');
const { writeFileSync } = require('fs');

module.exports = () => {
    try {
        glob('js/**/!(login.js|init.js)*', { nodir: true }, (err, files) => {
            if (err) throw err;
            manifest.content_scripts[0].js.push(...files);
            writeFileSync('manifest.json', JSON.stringify(manifest, null, 2), 'utf8');
        });
    } catch (err) {
        console.log('Error in reading js files ', err.message);
    }
};