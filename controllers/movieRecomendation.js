const OpenAI = require('openai');
const mongoose = require('mongoose');

const movieRecomendation = async (req, res) => {
	const moviesModel = mongoose.model('movies');

	const allMovies = await moviesModel.find({});
	const moviesString = allMovies.map((el) => el.movie_name).join(',');

	console.log();
	const openai = new OpenAI({
		apiKey: process.env.OPENAI_API_KEY,
	});
	async function main() {
		const chatCompletion = await openai.chat.completions.create({
			messages: [
				{
					role: 'user',
					content: `i need a movie recommendation base on these movies ${moviesString} provide 5 sugestions`,
				},
			],
			model: 'gpt-3.5-turbo',
		});

		console.log(chatCompletion.choices);
	}

	main();

	res.status(200).json({
		status: 'success',
	});
};

module.exports = movieRecomendation;
