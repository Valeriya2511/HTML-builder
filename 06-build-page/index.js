const fs = require('fs');
const path = require('path');

const projectDist = path.join(__dirname, 'project-dist');
const components = path.join(__dirname, 'components');
const styles = path.join(__dirname, 'styles');
const creatStyles = fs.createWriteStream(path.join(projectDist, 'style.css'));
const assetsPath = path.join(__dirname, 'assets');
const distAssetsPath = path.join(projectDist, 'assets');

async function readFileHtml() {
  return fs.promises.readFile(path.join(__dirname, 'template.html'), 'utf-8');
};

async function copyDir(assetsPath, distAssetsPath, file) {
  let subAssetsPath = path.join(assetsPath, file.name);
  let subDistAssetsPath = path.join(distAssetsPath, file.name);
  await copyAssets(subAssetsPath, subDistAssetsPath);
}

async function copyFile(assetsPath, distAssetsPath, file) {
  await fs.promises.copyFile(path.join(assetsPath, file.name), path.join(distAssetsPath, file.name));
}

async function copyAssets(assetsPath, distAssetsPath) {
  await fs.promises.rm(distAssetsPath, { force: true, recursive: true });
  await fs.promises.mkdir(distAssetsPath);
  let dir = await fs.promises.readdir(assetsPath, { withFileTypes: true });
  dir.forEach( file => {
    if (file.isDirectory()) copyDir(assetsPath, distAssetsPath, file);
    if (file.isFile()) copyFile(assetsPath, distAssetsPath, file);
  });
}


async function createProjectDist() {
	await fs.promises.mkdir(projectDist, { recursive: true });

  let template = await readFileHtml();
  const arrFiles = await fs.promises.readdir(components, { withFileTypes: true });
  for(let elem of arrFiles) {
    if (path.extname(path.join(components, elem.name)) === '.html') {
      let component = await fs.promises.readFile(path.join(components, elem.name), 'utf-8');
      template = template.replace(`{{${elem.name.split('.')[0]}}}`, component);
    };
  }

  await fs.promises.writeFile(path.join(projectDist, 'index.html'), template);
	

  const files = await fs.promises.readdir(styles, { withFileTypes: true });
  files.forEach(file => {
    if (path.extname(path.join(styles, file.name)) === '.css') {
      const input = fs.createReadStream(path.join(styles, file.name), 'utf8');
      input.on('data', data => creatStyles.write(data + '\n'));
    }
  });

	copyAssets(assetsPath, distAssetsPath);
}

createProjectDist();

