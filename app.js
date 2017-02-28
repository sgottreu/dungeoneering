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
    console.log('preflight');
    res.send(200);
  }
  else {
    next();
  }
});

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/dungeon-maker/build/index.html');
});

// ************* Dungeons ******************//
app.get('/findDungeonGrid', function (req, res) {
	var dungeon_grid = db.get('dungeoneering');

	dungeon_grid.findOne({ encounter_id: req.query.encounter_id }).then(function(docs) {
    res.writeHead(200, {"Content-Type": "application/json"});
    res.end( JSON.stringify( docs ) );
  });
});

app.get('/findDungeonGrids', function (req, res) {
	var dungeon_grid = db.get('dungeoneering');
	console.log('Finding grids');
	dungeon_grid.find({ _type: 'encounter' }).then(function(docs) {
    let grids = [];
    for(var x=0,len=docs.length;x<len;x++){
  		grids[x] = { encounter_id: docs[x].encounter_id, title: (docs[x].title !== undefined) ? docs[x].title : '' };
  	}
	  console.log(`Found ${grids.length} grids`);
    sendJSON(res, grids);
  }).catch(function(err){ 
    console.log(err);
  });
});

app.post('/saveDungeonGrids', function (req, res) {
	console.log('Saving grid');
	var dungeon_grid = db.get('dungeoneering');

	let payload = {
		encounter_id: (req.body.encounter_id) ? req.body.encounter_id : uuidV4(),
		_type: 'encounter',
		title: req.body.title,
		slots: req.body.slots
	};
	if(req.body.encounter_id) {
		dungeon_grid.findOneAndUpdate( { "encounter_id" : req.body.encounter_id }, payload ).then(function (data) {
			res.writeHead(200, {"Content-Type": "application/json"});
	    	res.end( JSON.stringify( data ) );
		});	
	} else {
		dungeon_grid.insert( payload ).then(function (data) {
			res.writeHead(200, {"Content-Type": "application/json"});
	    	res.end( JSON.stringify( data ) );
		});
	}
		
});

// ************* Entities ******************//

app.post('/saveEntity', function (req, res) {
	console.log('Saving Entity');
	var dungeon_grid = db.get('dungeoneering');

	let payload = {
		_type: req.body.entity.type,
		entity: req.body.entity
	};
	payload.entity.entity_id = (req.body.entity_id) ? req.body.entity_id : uuidV4();

	if(req.body.entity_id) {
		dungeon_grid.findOneAndUpdate( { "entity.entity_id" : req.body.entity_id }, payload )
		.then(function (data) {
			sendJSON(res, data);
		});	
	} else {
		dungeon_grid.insert( payload ).then(function (data) {
			sendJSON(res, data);
		});
	}

	dungeon_grid.insert( payload ).then(function (data) {
		sendJSON(res, data);
	});
});

app.get('/findEntities', function (req, res) {
	var dungeon_grid = db.get('dungeoneering');
	console.log('Finding Entities');
	dungeon_grid.find({ _type: {"$in": ["monster","character"] }}).then(function(docs) {
    let entities = { "monster": [], "character": [] };

    for(var x=0,len = docs.length;x<len;x++){
    	docs[x].entity.entity_id = docs[x].entity_id;
    	entities[ docs[x]._type ].push(docs[x].entity);
    }
    sendJSON(res, entities);
  });
});

app.get('/findEntity', function (req, res) {
	var dungeon_grid = db.get('dungeoneering');

	dungeon_grid.findOne({ "entity.entity_id": req.query.entity_id }).then(function(docs) {
    	sendJSON(res, docs);
  });
});

// ************* Powers ******************//

app.get('/findPowers', function (req, res) {
	var dungeon_grid = db.get('dungeoneering');

	dungeon_grid.find({ _type: 'power' }).then(function(docs) {
    let powers = [];
    for(var x=0,len=docs.length;x<len;x++){
			powers[x] = { power_id: docs[x].power_id };
			for(p in docs[x].power){
				if(docs[x].power.hasOwnProperty(p)){
					powers[x][p] = docs[x].power[p];
				}
			}
		}
    res.writeHead(200, {"Content-Type": "application/json"});
    res.end( JSON.stringify( powers ) );
  });
});

app.post('/savePower', function (req, res) {
	console.log('Saving Power');
	var dungeon_grid = db.get('dungeoneering');

	let payload = {
		power_id: uuidV4(),
		_type: 'power',
		power: req.body
	};

	dungeon_grid.insert( payload ).then(function (data) {
		sendJSON(res, data);
	});
});

// ************* Weapons ******************//

app.get('/findWeapons', function (req, res) {
  var dungeon_grid = db.get('dungeoneering');
  console.log('Finding Weapons');
  dungeon_grid.find({ _type: 'weapon' }, 
    { sort : { name : 1 } }).then(function(docs) {
    console.log(`Found ${docs.length} weapons`);
    sendJSON(res, docs);
  });
});

app.post('/saveWeapon', function (req, res) {
  console.log('Saving Weapon');
  var dungeon_grid = db.get('dungeoneering');

  let payload = JSON.parse(JSON.stringify(req.body));
  payload._type = 'weapon';
  delete payload._id;

  if(req.body._id) {
    dungeon_grid.findOneAndUpdate( { "_id" : monk.id(req.body._id) }, payload )
    .then(function (data) {
     console.log('findOneAndUpdate');
      sendJSON(res, data);
    }); 
  } else {
    dungeon_grid.insert( payload ).then(function (data) {
      console.log('insert');
      sendJSON(res, data);
    });
  }
});

function sendJSON(res, data){
	res.writeHead(200, {"Content-Type": "application/json"});
  res.end( JSON.stringify( data ) );
}

app.listen(port, function () {
  console.log('API listening on port '+port)
})