const fs = require('fs');
const path = require('path');
const copyPathName = path.resolve(__dirname, 'files-copy');
const origPathName = path.resolve(__dirname, 'files');
fs.mkdir(copyPathName, (error) => {
  if(error){
    return;
  }
  fs.readdir(origPathName, (error, files) => {
    files.forEach(file => {
      const origFilePath = path.resolve(origPathName, file.toString());
      const copyFilePath = path.resolve(copyPathName, file.toString());
      fs.copyFile(origFilePath, copyFilePath, ()=>{});
    });
  });
});