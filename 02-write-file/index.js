const { stdin } = process;
const fs = require('fs');
const path = require('path');
let fileData = '';
fs.writeFile(path.join(__dirname, 'text.txt'), fileData, () => {});
console.log('Please, write some text end press enter. If you want to exit type \'exit\'');
stdin.on('data', (data) => {
  if(data.toString() == 'exit\n' || data.toString() == 'exit\r\n'){
    process.exit();
  } else {
    fileData += data.toString();
    fs.writeFile(path.join(__dirname, 'text.txt'), fileData, () => {});
  }
});
process.on('SIGINT', ()=>{
  process.exit();
});
process.on('exit', ()=>{
  console.log('\nBye Bye');
});