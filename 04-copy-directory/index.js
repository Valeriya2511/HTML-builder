const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'files');
const copyDir = path.join(__dirname, 'files-copy');

async function copyFolder() {
	await fs.promises.rm(copyDir, {force: true, recursive: true});
	await fs.promises.mkdir(copyDir);
	(await fs.promises.readdir(dir, {withFileTypes: true})).forEach((elem) => {
		fs.copyFile(path.join(dir, elem.name), path.join(copyDir, elem.name), (err) => {
			if(err) {
				throw err;
			}
		})
	});
}

copyFolder();