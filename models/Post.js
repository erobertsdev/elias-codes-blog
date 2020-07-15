const mongoose = require('mongoose');
// const Schema = mongoose.Schema; // same as destructured version below
const { Schema } = mongoose;

const postSchema = new Schema({
	date: String,
	title: String,
	body: String,
	code: String,
	category: String,
	hashtags: String,
	comments: [ { body: String, date: Date } ],
	meta: {
		favorites: Number
	}
});

mongoose.model('posts', postSchema);
