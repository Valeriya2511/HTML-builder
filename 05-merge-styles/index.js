const fs = require('fs');
const path = require('path');

const styles =  path.join(path.join(__dirname, 'styles'));
const bundle =  path.join(path.join(__dirname, 'project-dist', 'bundle.css'));

const output = fs.createWriteStream(bundle);

async function newFileCss() {
  const files = await fs.promises.readdir(styles, { withFileTypes: true });
  files.forEach((elem) => {
    if (path.extname(path.join(styles, elem.name)) === '.css') {
      const input = fs.createReadStream(path.join(styles, elem.name), 'utf8');
      input.on('data', data => output.write(data + '\n'));
    }
  })
}

newFileCss();