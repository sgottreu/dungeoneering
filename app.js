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
	dungeon_grid.findOne({ "_id" : monk.id(req.query._id) }).then(function(docs) {
    console.log('Found grid');
    res.writeHead(200, {"Content-Type": "application/json"});
    res.end( JSON.stringify( docs ) );
  });
});

app.get('/findDungeonGrids', function (req, res) {
	var dungeon_grid = db.get('dungeoneering');
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
	var dungeon_grid = db.get('dungeoneering');

	let payload = {
		_type: 'dungeon',
		title: req.body.title,
		slots: req.body.slots
	};
	if(req.body._id) {
		dungeon_grid.findOneAndUpdate( { "_id" : monk.id(req.body._id) }, payload ).then(function (data) {
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

  let payload = JSON.parse(JSON.stringify(req.body));
  delete payload._id;

	if(req.body._id) {
		dungeon_grid.findOneAndUpdate( { "_id" : monk.id(req.body._id) }, payload )
		.then(function (data) {
			sendJSON(res, data);
		});	
	} else {
		dungeon_grid.insert( payload ).then(function (data) {
			sendJSON(res, data);
		});
	}

});

app.get('/findEntities', function (req, res) {
	var dungeon_grid = db.get('dungeoneering');
	console.log('Finding Entities');
	dungeon_grid.find({ _type: {"$in": ["monster","character"] }}).then(function(docs) {
    let entities = { "monster": [], "character": [] };

    for(var x=0,len = docs.length;x<len;x++){

    	entities[ docs[x]._type ].push(docs[x]);
    }

    console.log(`Found ${docs.length} entities`);
    res.writeHead(200, {"Content-Type": "application/json"});
    res.end( JSON.stringify( entities ) );
  });
});

app.get('/findEntity', function (req, res) {
	var dungeon_grid = db.get('dungeoneering');

	dungeon_grid.findOne({ "_id" : monk.id(req.body._id) }).then(function(docs) {
    	sendJSON(res, docs);
  });
});

// ************* Powers ******************//

app.get('/findPowers', function (req, res) {
	var dungeon_grid = db.get('dungeoneering');

	dungeon_grid.find({ _type: 'power' }).then(function(docs) {
    sendJSON(res, docs);
  });
});

app.post('/savePower', function (req, res) {
	console.log('Saving Power');
	var dungeon_grid = db.get('dungeoneering');

  let payload = JSON.parse(JSON.stringify(req.body));
  delete payload._id;

  if(req.body._id) {
    dungeon_grid.findOneAndUpdate( { "_id" : monk.id(req.body._id) }, payload )
    .then(function (data) {
      sendJSON(res, data);
    }); 
  } else {
    dungeon_grid.insert( payload ).then(function (data) {
      sendJSON(res, data);
    });
  }
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
});

