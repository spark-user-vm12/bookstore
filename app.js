const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var autoIncrement = require("mongodb-autoincrement");
var mongoose = require('mongoose');
mongoose.plugin(autoIncrement.mongoosePlugin);

//app.use(express.static(__dirname+'/client'));
app.use(bodyParser.json());

Event =require('./models/event');

Guest =require('./models/guest');

// Connect to Mongoose
//mongoose.connect('mongodb://localhost/eventmanagerdb');
var mongodb_host = process.env.MONGODB_HOST || "localhost";
var mongodb_port = process.env.MONGODB_PORT || 27017;
mongoose.connect(`mongodb://${mongodb_host}:${mongodb_port}/eventmanagerdb`);
var db = mongoose.connection;

app.get('/', (req, res) => {
	res.send('Please use /events or /guests');
});

app.get('/guests', (req, res) => {
	Guest.getGuests((err, guests) => {
		if(err){
			throw err;
		}
		res.json(guests);
	});
});

app.get('/guests/:_id', (req, res) => {
	Guest.getGuestById(req.params._id, (err, guest) => {
		if(err){
			throw err;
		}
		res.json(guest);
	});
});


app.post('/guests', (req, res) => {
	var guest = req.body;
	Guest.addGuest(guest, (err, guest) => {
		if(err){
			throw err;
		}
		res.json(guest);
	});
});

app.put('/guests/:_id', (req, res) => {
	var id = req.params._id;
	var guest = req.body;
	Guest.updateGuest(id, guest, {}, (err, guest) => {
		if(err){
			throw err;
		}
		Guest.getGuestById(req.params._id, (err, event) => {
			if(err){
				throw err;
			}
			res.json(event);
		});
	});
});

app.delete('/guests/:_id', (req, res) => {
	var id = req.params._id;
	Guest.removeGuest(id, (err, guest) => {
		if(err){
			throw err;
		}
		res.json(guest);
	});
});



app.get('/events', (req, res) => {
	Event.getEvents((err, events) => {
		if(err){
			throw err;
		}
		res.json(events);
	});
});

app.get('/events/:_id', (req, res) => {
	Event.getEventById(req.params._id, (err, event) => {
		if(err){
			throw err;
		}
		res.json(event);
	});
});

app.get('/events/:_id/guests', (req, res) => {
	Event.getEventById(req.params._id, (err, event) => {
		if(err){
			throw err;
		}
		var guestList = [];
			Guest.getGuestsById(event.guestsIds, (err, guests) => {
				if(!err){
					res.json(guests);
				}					
			});	
	});
});

app.put('/events/:_id/guests', (req, res) => {
	var id = req.params._id;
	var guestsIds = req.body;
	Event.addGuests( id,guestsIds,{}, (err, guests) => {
		if(err){
			throw err;
		}
		res.json(guests);
	});
});

app.delete('/events/:e_id/guests/:g_id', (req, res) => {
	var eventID = req.params.e_id;
	var guestID = req.params.g_id;
	Event.deleteGuest( eventID,guestID,{}, (err, guests) => {
		if(err){
			throw err;
		}
		res.json(guests);
	});
});


app.post('/events', (req, res) => {
	var event = req.body;
	Event.createEvent(event, (err, event) => {
		if(err){
			throw err;
		}
		res.json(event);
	});
});

app.put('/events/:_id', (req, res) => {
	var id = req.params._id;
	var event = req.body;
	Event.updateEvent(id, event, {}, (err, event) => {
		if(err){
			throw err;
		}
		Event.getEventById(id, (err, event) => {
			if(err){
				throw err;
			}
			res.json(event);
		});
	});
});

app.delete('/events/:_id', (req, res) => {
	var id = req.params._id;
	Event.deleteEvent(id, (err, event) => {
		if(err){
			throw err;
		}
		res.json(event);
	});
});

app.listen(3000);
console.log('Running on port 3000...');
