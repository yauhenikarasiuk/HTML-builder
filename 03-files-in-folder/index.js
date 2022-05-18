const fs = require('fs');
const path = require('path');
const folderName = 'secret-folder';

fs.readdir(path.join(__dirname, folderName), (error, files) => {
  files.forEach(file => {
    let pathName = path.join(__dirname, folderName, file.toString());
    fs.stat(pathName, (error, stats) => {
      if(stats.isFile()){
        let { ext, name} = path.parse(pathName);
        let size = stats.size / 1000;
        console.log(`${name} - ${ext.slice(1)} - ${size}kb`);
      }
    });
  });
});