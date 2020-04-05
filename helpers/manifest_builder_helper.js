const glob = require('glob');
const manifest = require('./config/manifest');
const { writeFileSync } = require('fs');

const readAllJsFiles = () => {
    return new Promise((resolve, reject) => {
        glob('js/**/!(login.js|init.js)*', { nodir: true }, (err, files) => {
            return err ? reject('Error in reading js files ', err.message) : resolve(files);
        });
    })
}

module.exports = async () => {
    try {
        const jsFiles = await readAllJsFiles();
        manifest.content_scripts[0].js.push(...jsFiles);
        writeFileSync('manifest.json', JSON.stringify(manifest, null, 2), 'utf-8');
    } catch (err) {
        console.log(err);
    }
}
