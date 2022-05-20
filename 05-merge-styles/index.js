const fs = require('fs');
const path = require('path');
const destPath = path.resolve(__dirname, 'project-dist', 'bundle.css');
const stylesPath = path.resolve(__dirname, 'styles');
let bundleData = [];
fs.readdir(stylesPath, (error, files) => {
  files.filter(file => file.endsWith('.css')).forEach((file, index, arr) => {
    let filePath = path.resolve(stylesPath, file.toString());
    fs.readFile(filePath, (error, data) => {
      bundleData[index] = data.toString();
      if(bundleData.length == arr.length && !bundleData.includes(undefined)){
        fs.writeFile(destPath, bundleData.join(''), ()=>{});
      }
    });
  });
});