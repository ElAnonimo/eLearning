var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// User Schema
var UserSchema = mongoose.Schema({
	username: {
		type: String
	},
	email: {
		type: String
	},
	password: {
		type: String,
		bcrypt: true
	},
	type: {
		type: String
	}
});

var User = module.exports = mongoose.model('User', UserSchema);

// Get single user (by id)
module.exports.getUserById = function(id, callback) {
	User.findById(id, callback);
}

// Get user by username
module.exports.getUserByUsername = function(username, callback) {
	var query = {username: username};
	User.findOne(query, callback);
}

// Compare password
module.exports.comparePassword = function(candidatePassword, hash, callback) {
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
		if (err) throw err;
		callback(null, isMatch);
	});
}

// Create student user
module.exports.saveStudent = function(newUser, newStudent, callback) {
	bcrypt.hash(newUser.password, 10, function(err, hash) {
		if (err) throw err;
		// Set hash
		newUser.password = hash;
		console.log('New student is being saved.');
		async.parallel([newUser.save, newStudent.save], callback);
	});
}

// Create instructor user
module.exports.saveInstructor = function(newUser, newInstructor, callback) {
	bcrypt.hash(newUser.password, 10, function(err, hash) {
		if (err) throw err;
		// Set hash
		newUser.password = hash;
		console.log('New instructor is being saved.');
		async.parallel([newUser.save, newInstructor.save], callback);
	});
}