const mongoose = require('mongoose');

const editMovie = async (req, res) => {
	const moviesModel = mongoose.model('movies');

	const { movie_id, movie_name, rating, info, description } = req.body;

	try {
		if (!movie_id) throw ' Movie id is required';
	} catch (e) {
		res.status(400).json({
			status: 'Failed',
			message: e.message,
		});
		return;
	}

	try {
		await moviesModel.updateOne(
			{
				_id: movie_id,
			},
			{
				movie_name: movie_name,
				reting: rating,
				info: info,
				description: description,
			},
			{
				runValidators: true,
			}
		);
	} catch (e) {
		res.status(400).json({
			status: 'Failed',
			message: e.message,
		});
		return;
	}

	res.status(200).json({
		status: 'success',
		message: 'movie has been updated',
	});
};

module.exports = editMovie;
