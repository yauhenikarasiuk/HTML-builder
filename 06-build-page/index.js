const fs = require('fs');
const path = require('path');
const distPath = path.join(__dirname, 'project-dist');
const assetsPath = path.join(__dirname, 'assets');
const stylesPath = path.resolve(__dirname, 'styles');
const templatePath = path.join(__dirname, 'template.html');
const componentsPath = path.join(__dirname, 'components');

fs.rm(distPath, {recursive: true, force: true}, () => {
  fs.mkdir(distPath, () => {
    //Fill in template and copy
    fs.readFile(templatePath, (error, templateFileContent) => {
      let templateContent = templateFileContent.toString();
      fs.readdir(componentsPath, (error, componentFiles) => {
        componentFiles.forEach((componentFile => {
          fs.readFile(path.join(componentsPath, componentFile), (error, componentContent) => {
            let bindingName = componentFile.replace('.html', '');
            templateContent = templateContent.replace(`{{${bindingName}}}`, componentContent.toString());
            if(templateContent.indexOf('{{') == -1 && templateContent.indexOf('}}') == -1){
              fs.writeFile(path.join(distPath, 'index.html'), templateContent, ()=>{});
            }
          });
        }));
      });
    });
    //Merge styles
    fs.readdir(stylesPath, (error, files) => {
      let bundleData = [];
      files.filter(file => file.endsWith('.css')).forEach((file, index, arr) => {
        let filePath = path.resolve(stylesPath, file.toString());
        fs.readFile(filePath, (error, data) => {
          bundleData[index] = data.toString();
          if(bundleData.length == arr.length && !bundleData.includes(undefined)){
            fs.writeFile(path.join(distPath, 'style.css'), bundleData.join(''), ()=>{});
          }
        });
      });
    });
    //Copy assets
    copyDir(assetsPath, path.join(distPath, 'assets'));
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
    
  });
});
