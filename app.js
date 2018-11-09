const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var autoIncrement = require("mongodb-autoincrement");
var mongoose = require('mongoose');
mongoose.plugin(autoIncrement.mongoosePlugin);
var os = require("os");
var hostname = os.hostname();

app.use(bodyParser.json());

Guest = require('./models/guest');
Event = require('./models/event');

// Connect to Mongoose
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

app.get('/guests/:_id/events', (req, res) => {
	Event.getGuestEvents(req.params._id,{}, (err, events) => {
		if(err){
			throw err;
		}
		res.json(events);
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
		genGuestRoutes(events,req.headers.host);
		res.json(events);
	});
});

app.get('/events/:_id', (req, res) => {
	Event.getEventById(req.params._id, (err, event) => {
		if(err){
			throw err;
		}
		genGuestRoutes([event],req.headers.host);
		res.json(event);
	});
});

app.get('/events/:_id/guests', (req, res) => {
	Event.getEventById(req.params._id, (err, event) => {
		if(err){
			throw err;
		}
		/*
		Guest.getGuestsById(event.guests, (err, guests) => {
			if(!err){
				res.json(guests);
			}					
		});	
		*/
		genGuestRoutes([event],req.headers.host);
		res.json(event.guests);
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
console.log('App up and Running on port 3000...');

function genRoute(host,route,id){
	return `http://${host}/${route}/${id}`;
}

function genGuestRoutes(events,host){
	events.forEach(event => {
		var routes = event.guests.map((guestID)=>{
			return genRoute(host,'guests',guestID)
		});
		event.guests = routes;	
	});
	return events;
}
