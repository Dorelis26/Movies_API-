const mongoose = require('mongoose');

const moviesSchema = new mongoose.Schema({
	movie_name: {
		type: String,
		require: [true, 'Movie name is required'],
	},
	info: {
		type: String,
	},
	rating: {
		type: Number,
	},
	description: {
		type: String,
	},
});

const movieModel = mongoose.model('movies', moviesSchema);

module.exports = movieModel;
