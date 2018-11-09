const mongoose = require('mongoose');

// Event Schema
const eventSchema = mongoose.Schema({
	name:{
		type: String,
		required: true
	},
	description:{
		type: String,
		required: true
	},
	start_date:{
		type: Date,
		required: true
	},
	end_date:{
		type: Date,
		required: true
	},
	guests:{
		type: Array
	}
});

const Event = module.exports = mongoose.model('Event', eventSchema);

// Get Events
module.exports.getEvents = (callback, limit) => {
	Event.find(callback).limit(limit);
}

// Get Event
module.exports.getEventById = (id, callback) => {
	Event.findById(id, callback);
}

// Create Event
module.exports.createEvent = (event, callback) => {
	Event.create(event, callback);
}

// Add Guests
module.exports.addGuests = (id, guestsIds, options, callback) => {
	var query = {_id: id};
	var update = {
		$push: {guests:guestsIds}
	}
	Event.findOneAndUpdate(query, update, options, callback);
}

// Delete Guest
module.exports.deleteGuest = (eventID, guestID, options, callback) => {
	/*
	var query = {_id: eventID};
	var update = {
		$pull: {guestsIds:guestID}
	}
	Event.findOneAndUpdate(query, update, options, callback);
*/
	Event.findOneAndUpdate({_id: eventID},{$pull: {guests:guestID}},{}, callback);
}

// Get Guest Events
module.exports.getGuestEvents = (guestID, options, callback) => {
	/*
	var query = {_id: eventID};
	var update = {
		$pull: {guestsIds:guestID}
	}
	Event.findOneAndUpdate(query, update, options, callback);
*/
	Event.find({guests: guestID}, callback);
}


// Update Event
module.exports.updateEvent = (id, event, options, callback) => {
	var query = {_id: id};
	var update = {
		name: event.name,
		description: event.description,
		start_date: event.start_date,
		end_date: event.end_date,
		guestsList: event.guestsList
	}
	Event.findOneAndUpdate(query, update, options, callback);
}

// Delete Event
module.exports.deleteEvent = (id, callback) => {
	var query = {_id: id};
	Event.remove(query, callback);
}
