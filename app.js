var express = require('express');
var mongo = require('mongodb');
var monk = require('monk');
var bodyParser = require('body-parser');
const uuidV4 = require('uuid/v4');
var dotenv = require('dotenv');
var methodOverride = require('method-override');

var mongodb_config = (process.env.mongodb) ? process.env.mongodb : process.argv[2];
mongodb_config = (!mongodb_config) ? dotenv['mongodb'] : mongodb_config;
var mongo_url = 'mongodb://'+mongodb_config;
var db = monk(mongo_url);
const fs = require('fs');

var app = express();

var port = process.env.PORT || '4000';
app.set('port', port);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(methodOverride());
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

const dungeon_grid = db.get('dungeoneering');

function logErrors (err, req, res, next) {
  console.error(err.stack)
  next(err)
}

function clientErrorHandler (err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' })
  } else {
    next(err)
  }
}

function errorHandler (err, req, res, next) {
  if (res.headersSent) {
    return next(err)
  }
  res.status(500)
  res.render('error', { error: err })
}



app.use(express.static(__dirname + '/dungeon-maker/build'))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  if ('OPTIONS' == req.method) {
   res.sendStatus(200);
  }
  else {
    next();
  }
});

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/dungeon-maker/build/index.html');
});

// ************* Encounters ******************//

app.post('/saveEncounter', function (req, res) {
	console.log('Saving encounter');

	let payload = {
		_type: 'encounter',
		name: req.body.name,
		dungeons: req.body.dungeons
	};console.log(payload);
	 _Save(req, res, payload);		
});

app.get('/findEncounters', function (req, res) {
	console.log('Finding encounters');

	dungeon_grid.find({ _type: 'encounter' }).then(function(docs) {
	  console.log(`Found ${docs.length} grids`);
    sendJSON(res, docs);
  }).catch(function(err){ 
    console.log(err);
  });
});

app.get('/findEncounter', function (req, res) {
	dungeon_grid.findOne({ "_id" : monk.id(req.query._id) }).then(function(docs) {
    console.log('Found encounter');
    sendJSON(res, docs);
  });
});

// ************* Dungeons ******************//
app.get('/findDungeonGrid', function (req, res) {
	dungeon_grid.findOne({ "_id" : monk.id(req.query._id) }).then(function(docs) {
    console.log('Found grid');
    sendJSON(res, docs);
  });
});

app.get('/findDungeonGrids', function (req, res) {
	console.log('Finding grids');

	dungeon_grid.find({ _type: 'dungeon' }).then(function(docs) {
	  console.log(`Found ${docs.length} grids`);
    let grids = [];
    docs.map( (grid, i) => { grids.push({_id: docs[i]._id, title: docs[i].title }) });
    sendJSON(res, grids);
  }).catch(function(err){ 
    console.log(err);
  });
});

app.post('/saveDungeonGrids', function (req, res) {
	console.log('Saving grid');

	let payload = {
		_type: 'dungeon',
		title: req.body.title,
		slots: req.body.slots
	};
	 _Save(req, res, payload);
		
});

// ************* Parties ******************//

app.post('/saveParty', function (req, res) {
	console.log('Saving Party');

  let payload = JSON.parse(JSON.stringify(req.body));

  _Save(req, res, payload);

});

app.get('/findParties', function (req, res) {
	console.log('Finding Parties');
  dungeon_grid.find( { _type: "party"} ).then(function(docs) {
    console.log(`Found ${docs.length} Parties`);
    sendJSON(res, docs);
  });
});


// ************* Entities ******************//

app.post('/saveEntity', function (req, res) {
	console.log('Saving Entity');

  let payload = JSON.parse(JSON.stringify(req.body));
  _Save(req, res, payload);

  if(payload._type == 'monster'){
    dungeon_grid.find({ _type: 'dungeon' }).then(function(docs) {
      for(var z=0,len=docs.length;z<len;z++){
        updated = false;
        console.log('Looking at Dungeon: '+docs[z].title);
        for(var x=0,len2=docs[z].slots.length;x<len2;x++){
          if(docs[z].slots[x].overlays.entity && docs[z].slots[x].overlays.entity._id == req.body._id){
            docs[z].slots[x].overlays.entity = JSON.parse(JSON.stringify(payload));
            updated = true;
            break;
          }
        }
        if(updated){
          var _id = JSON.parse(JSON.stringify(docs[z]._id));
          delete docs[z]._id;
          dungeon_grid.findOneAndUpdate( { "_id" : monk.id(_id) }, docs[z] ).then(function (data) {
            console.log('Dungeon Updated: '+docs[z].title);
          });
        }
      };
    });
  }

  if(payload._type == 'character'){
    dungeon_grid.find({ _type: 'party' }).then(function(docs) {
      for(var z=0,len=docs.length;z<len;z++){
        updated = false;
        console.log('Looking at Party: '+docs[z].name);
        for(var x=0,len2=docs[z].members.length;x<len2;x++){
          if(docs[z].members[x] && docs[z].members[x]._id == req.body._id){
            docs[z].members[x] = JSON.parse(JSON.stringify(payload));
            updated = true;
          }
        }
        if(updated){
          var _id = JSON.parse(JSON.stringify(docs[z]._id));
          delete docs[z]._id;
          dungeon_grid.findOneAndUpdate( { "_id" : monk.id(_id) }, docs[z] ).then(function (data) {
            console.log('Party Updated');
          });
        }
      };
    });
  }

});

app.get('/findMonsters', function (req, res) {
	console.log('Finding Monsters');
  let query = { _type: {"$in": ["monster"] }};
	dungeon_grid.find(query).then(function(docs) {
    let entities = [];

    for(var x=0,len = docs.length;x<len;x++){
    	entities.push(docs[x]);
    }

    console.log(`Found ${docs.length} Monsters`);
    sendJSON(res, entities);
  });
});

app.get('/findCharacters', function (req, res) {
	console.log('Finding Characters');
  let query = { _type: {"$in": ["character"] }};
	dungeon_grid.find(query).then(function(docs) {
    let entities = [];

    for(var x=0,len = docs.length;x<len;x++){
    	entities.push(docs[x]);
    }

    console.log(`Found ${docs.length} Characters`);
    sendJSON(res, entities);
  });
});

app.get('/findEntity', function (req, res) {
	dungeon_grid.findOne({ "_id" : monk.id(req.body._id) }).then(function(docs) {
    	sendJSON(res, docs);
  });
});

// ************* Powers ******************//

app.get('/findPowers', function (req, res) {
	dungeon_grid.find({ _type: 'power' }).then(function(docs) {
    sendJSON(res, docs);
  });
});

app.post('/savePower', function (req, res) {
	console.log('Saving Power');
  let payload = JSON.parse(JSON.stringify(req.body));
  payload._type = "power";
  _Save(req, res, payload);
});

// ************* Weapons ******************//

app.get('/findWeapons', function (req, res) {
  console.log('Finding Weapons');
  dungeon_grid.find({ _type: 'weapon' }, 
    { sort : { name : 1 } }).then(function(docs) {
    console.log(`Found ${docs.length} weapons`);
    sendJSON(res, docs);
  });
});

app.post('/saveWeapon', function (req, res) {
  console.log('Saving Weapon');
  
  let payload = JSON.parse(JSON.stringify(req.body));
  payload._type = 'weapon';
  _Save(req, res, payload);
});

// ************* Gear ******************//

app.get('/findGear', function (req, res) {
  console.log('Finding Gear');
  dungeon_grid.find({ _type: 'gear' }, 
    { sort : { name : 1 } }).then(function(docs) {
    console.log(`Found ${docs.length} gear`);
    sendJSON(res, docs);
  });
});

app.get('/findGearCategories', function (req, res) {
  console.log('Finding Gear Categories');
  dungeon_grid.find({ _type: 'gear' }, 
    { sort : { category : 1 } }).then(function(docs) {
    var categories = [];

    for(var x=0,len=docs.length;x<len;x++){
      let i = categories.findIndex(function(item){
        return item === docs[x].category;
      });

      if(i === -1){
        categories.push(docs[x].category);
      }
    }
    console.log(`Found ${categories.length} gear`);

    sendJSON(res, categories);
  });
});

app.post('/saveGear', function (req, res) {
  console.log('Saving Gear');
  
  let payload = JSON.parse(JSON.stringify(req.body));
  payload._type = 'gear';
  _Save(req, res, payload);
});





// ************* Admin ******************//
app.get('/admin', function (req, res) {
  // let query = { _type: {"$in": ["monster"] }};
	// dungeon_grid.find(query).then(function(docs) {
  //   let entities = [];

  //   for(var x=0,len = docs.length;x<len;x++){
  //     docs[x].powers.map(p => {
  //       p._id = uuidV4();
  //       return p;
  //     })

  //     dungeon_grid.findOneAndUpdate( { "_id" : monk.id(docs[x]._id) }, docs[x] ).then(function (data) {
  //       console.log(`${docs[x].name} updated!`);
  //     }).catch(function(err){ 
  //       console.log(err);
  //     });
  //   }

  //   sendJSON(res, docs);
  // });
});

/*********** Global  *************/

function sendJSON(res, data){
	res.writeHead(200, {"Content-Type": "application/json"});
  res.end( JSON.stringify( data ) );
}

function _Save(req, res, payload){
  delete payload._id;
  
  if(req.body._id) {
    dungeon_grid.findOneAndUpdate( { "_id" : monk.id(req.body._id) }, payload ).then(function (data) {
      console.log(`${payload._type} updated!`);
      sendJSON(res, data);
    }).catch(function(err){ 
      console.log(err);
    });
	} else {
		dungeon_grid.insert( payload ).then(function (data) {
			console.log(`${payload._type} inserted!`);
      sendJSON(res, data);
		});
	}
}

// app.get('/reports/coverage', function (req, res) {
//   res.sendFile(__dirname + '/dungeon-maker/reports/coverage.html');
// });

app.get('/reports/src/*', (req, res) => {
  fs.readFile(__dirname + '/'+req.originalUrl, (err, data) => {
    if (err) {
      var newPath = req.originalUrl.replace('/reports/', '');
      // newPath = newPath.replace('/', '\\');
      newPath = (newPath.indexOf('.html') > -1) ? newPath : newPath+'.html';
      res.sendFile(__dirname + '/dungeon-maker/coverage/lcov-report/'+newPath);

      //throw err;
      return true;
    }
    res.sendFile(__dirname + '/dungeon-maker/public/'+req.originalUrl);
  });  
});

app.get('/reports/*', (req, res) => {
  fs.readFile(__dirname + '/'+req.originalUrl, (err, data) => {
    if (err) {
      if(req.originalUrl.indexOf('/reports/data.json') > -1){
        let json = require('./dungeon-maker/reports/data.json');
        sendJSON(res, json);
      } else {
        res.sendFile(__dirname + '/dungeon-maker/'+req.originalUrl);
      }
     
      //throw err;
      return true;
    }
    res.sendFile(__dirname + '/dungeon-maker/public/'+req.originalUrl);
  });  
});

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/dungeon-maker/build/index.html');
});


app.listen(port, function () {
  console.log('API listening on port '+port)
});

