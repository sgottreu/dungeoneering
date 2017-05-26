
var mongo = require('mongodb');
var monk = require('monk');

var dotenv = require('dotenv');

var mongodb_config = (process.env.mongodb) ? process.env.mongodb : process.argv[2];
mongodb_config = (!mongodb_config) ? dotenv['mongodb'] : mongodb_config;
var mongo_url = 'mongodb://'+mongodb_config;
var db = monk(mongo_url);
const fs = require('fs');

const dungeon_grid = db.get('dungeoneering');

dungeon_grid.find().then(function(docs) {
  fs.writeFile('./data/export.json', JSON.stringify(docs), (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
    process.exit(0);
  });
}).catch(function(err){ 
  console.log(err);
  process.exit(1);
});
