const mongoose = require('mongoose');

const addMovie = async (req, res) => {
	const moviesModel = mongoose.model('movies');

	//by distructuring we are ignoring any variable that is not relevent to us.
	const { movie_name, info, rating, description } = req.body;
	//validations...
	try {
		// if (!movie_name) throw 'movie name is required';
		if (!info) throw 'info is required';
		if (!rating) throw ' rating is required';
		if (rating < 1 || rating > 10) throw 'rating  should be from 1 to 10';
	} catch (e) {
		res.status(400).json({
			status: 'failed',
			message: e,
		});
	}

	//succsess!
	try {
		const createdMovie = await moviesModel.create({
			movie_name: movie_name,
			info: info,
			rating: rating,
			description: description,
		});

		console.log(`\nthe following movie has been created : ${createdMovie}`);
	} catch (e) {
		res.status(400).json({
			status: 'failed',
			message: e.mesage,
		});
	}

	res.status(200).json({
		status: 'Success',
		mesage: 'Movie added succsessfully!',
	});
};

module.exports = addMovie;
