const fs = require('fs');
const cp = require('child_process');

fs.watchFile('./coverage.json', function(eventType, filename){
  var output = cp.execSync('istanbul report -r ./coverage.json html');
  console.log(output);
});