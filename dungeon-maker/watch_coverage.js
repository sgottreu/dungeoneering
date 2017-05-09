const fs = require('fs');
const cp = require('child_process');

//fs.watchFile('./coverage.json', function(eventType, filename){
  var output = cp.exec('istanbul report -r "./coverage.json"');
  console.log('rebuilding coverage.json');
  fs.readFile('./coverage.json', (err, data) => {
	  if (err) throw err;
	  var json = JSON.parse(data);
	  var map = new Map(Object.entries(json.coverageMap));

    var coverageMap = [];

    for (var file of map.values()) {

      let _tmp = file.path.split('dungeon-maker'); 
      var fullpath = _tmp[1].replace(/\\/g, "/");
      var dirs = fullpath.split('/');
      console.log(fullpath);
      for(var x=0;x<=dirs.length-2;x++){
        dirs[x] = "__"+dirs[x];
      }

      var sortName = dirs.join('/')

      var _statements = Object.keys(file.s).map(function (key) { return file.s[key]; });
      var _functions = Object.keys(file.f).map(function (key) { return file.f[key]; });
      var _branches = Object.keys(file.b).map(function (key) { return file.b[key]; });

      coverageMap.push( {
        pathname: fullpath,
        sortName: sortName,
        path: dirs,
        file: dirs[dirs.length-1],
        statements: {
          total: _statements.length,
          covered: _statements.reduce(function(acc, val) { return acc + ((val > 0) ? 1 : 0) }, 0)
        },
        functions: {
          total: _functions.length,
          covered: _functions.reduce(function(acc, val) { return acc + ((val > 0) ? 1 : 0) }, 0)
        },
        branches: {
          total: _branches.length,
          covered: _branches.reduce(function(acc, val) { return acc + ((val > 0) ? 1 : 0) }, 0)
        }
      });
    }

    coverageMap.sort(function(a, b) {
      var nameA = a.sortName.toLowerCase(), nameB = b.sortName.toLowerCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      } else {
        if (nameA > nameB) {
          return 1;
        } else {
          return 0;
        }
      }
    });

    fs.writeFile('./reports/data.json', JSON.stringify(coverageMap), (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    });
  });
// });

const reduce = Function.bind.call(Function.call, Array.prototype.reduce);
const isEnumerable = Function.bind.call(Function.call, Object.prototype.propertyIsEnumerable);
const concat = Function.bind.call(Function.call, Array.prototype.concat);
const keys = Reflect.ownKeys;

if (!Object.values) {
	Object.values = function values(O) {
		return reduce(keys(O), (v, k) => concat(v, typeof k === 'string' && isEnumerable(O, k) ? [O[k]] : []), []);
	};
}

if (!Object.entries) {
	Object.entries = function entries(O) {
		return reduce(keys(O), (e, k) => concat(e, typeof k === 'string' && isEnumerable(O, k) ? [[k, O[k]]] : []), []);
	};
}

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