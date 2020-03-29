//order doesn't matter as long as the application (angular.module) is initialized first
import glob from 'glob';
import { relative } from 'path';
import { manifest } from './config/manifest.js';
import { writeFileSync } from 'fs';

const readAllJsFiles = () => {
    return new Promise((resolve, reject) => {
        glob('../js/**/!(login.js|init.js)*', { nodir: true }, (err, files) => {
            if (err) {
                reject('Error in reading the file names ', err);
            } else {
                resolve(files.map(file => relative('..', file)));
            }
        });
    })
}

readAllJsFiles().then((files) => {
    manifest.content_scripts[0].js.push(...files);
    writeFileSync('../manifest.json', JSON.stringify(manifest, null, 2), "utf8");
});