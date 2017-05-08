const fs = require('fs');
const cp = require('child_process');

fs.watchFile('./coverage.json', function(eventType, filename){
  var output = cp.exec('istanbul report -r "./coverage.json"');
  console.log('rebuilding');
});

// var istanbul = require('istanbul'),
//     collector = new istanbul.Collector(),
//     reporter = new istanbul.Reporter(),
//     sync = false;

// fs.readFile('./coverage.json', (err, data) => {
//   if (err) throw err;
//   collector.add( JSON.parse(data) );

//   reporter.add('lcov');
//   // reporter.addAll([ 'lcov', 'html' ]);
//   reporter.write(collector, sync, function () {
//       console.log('All reports generated');
//   });
// });