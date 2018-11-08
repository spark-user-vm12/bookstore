const mongoose = require('mongoose');

// Guest Schema
const guestSchema = mongoose.Schema({
	first_name:{
		type: String,
		required: true
	},
	last_name:{
		type: String,
		required: true
	},
	email:{
		type: String,
		required: true
	},
	eventIds:{
		type:Array
	}
});	

const Guest = module.exports = mongoose.model('Guest', guestSchema);

// Get Guest
module.exports.getGuests = (callback, limit) => {
	Guest.find(callback).limit(limit);
}

// Get Guest
module.exports.getGuestById = (id, callback) => {
	Guest.findById(id, callback);
}

// Get Guests by Id
module.exports.getGuestsById = (ids, callback) => {
	Guest.find({
		_id:{$in: ids}
	}, callback);
}

// Get Guests Events
module.exports.getGuestEvents = (id, callback) => {
	Guest.find({
		_id:{$in: ids}
	}, callback);
}

// Add Guest
module.exports.addGuest = (genre, callback) => {
	Guest.create(genre, callback);
}

// Update Guest
module.exports.updateGuest = (id, guest, options, callback) => {
	var query = {_id: id};
	var update = {
		first_name: guest.first_name,
		last_name: guest.last_name,
		email: guest.email
	}
	Guest.findOneAndUpdate(query, update, options, callback);
}


// Delete Guest
module.exports.removeGuest = (id, callback) => {
	var query = {_id: id};
	Guest.remove(query, callback);
}
