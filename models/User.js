const mongoose = require('mongoose');
// const Schema = mongoose.Schema; // same as destructured version below
const { Schema } = mongoose;

const userSchema = new Schema({
	googleId: String,
	name: String,
	email: String
});

mongoose.model('users', userSchema);
