const fs = require('fs');
const path = require('path');
const destPath = path.resolve(__dirname, 'project-dist', 'bundle.css');
const stylesPath = path.resolve(__dirname, 'styles');
let bundleData = '';
fs.readdir(stylesPath, (error, files) => {
  files.forEach(file => {
    let filePath = path.resolve(stylesPath, file.toString());
    const { ext } = path.parse(filePath);
    if(ext == '.css'){
      fs.readFile(filePath, (error, data) => {
        bundleData += data.toString();
        fs.writeFile(destPath, bundleData, ()=>{});
      });
    }
  });
});