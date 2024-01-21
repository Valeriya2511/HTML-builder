const path = require('path');
const fs = require('fs');

const pathFiles = path.join(__dirname, 'secret-folder');

fs.readdir(pathFiles, (err, files) => {
    if (err) throw err;
    for(let file of files) {
        const infoFile = path.parse(file);

        fs.stat(path.join(pathFiles, infoFile.base), (err, stats) => {
            if (err) throw err;
            if(stats.isDirectory()){
                return;
            }
            console.log(`${infoFile.name} - ${infoFile.ext.replace('.', '')} - ${stats.size / 1000}KB`)
        })
    }
});