const fs = require('fs');
const path = require('path');
const copyPathName = path.resolve(__dirname, 'files-copy');
const origPathName = path.resolve(__dirname, 'files');

copyDir(origPathName, copyPathName);
function copyDir(from, to){
  fs.mkdir(to, {recursive: true}, () => {
    fs.readdir(from, (error, files) => {
      files.forEach(fileName => {
        fs.stat(path.join(from, fileName), (error, stats) => {
          if(stats.isFile()){
            fs.copyFile(path.join(from, fileName), path.join(to, fileName), () => {});
          } else {
            copyDir(path.join(from, fileName), path.join(to, fileName));
          }
        });
      });
    });
  });
}