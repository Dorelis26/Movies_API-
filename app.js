const express = require('express');
require('dotenv').config();

const addMovie = require('./controllers/addMovie');
const app = express();
app.use(express.json());

const port = 8000;

const mongoose = require('mongoose');
const getAllMovies = require('./controllers/getAllMovies');
const getSingleMovie = require('./controllers/getSingleMovie');
const editMovie = require('./controllers/editMovie');
const deleteMovie = require('./controllers/deleteMovie');
const movieRecomendation = require('./controllers/movieRecomendation');

//connect to mongoDb
mongoose
	.connect(process.env.mongo_connection, {})
	.then(() => {
		console.log('connected to mongoDb');
	})
	.catch(() => {
		console.log('connection to mongoDb failed');
	});
//models
require('./models/movies.model');

//routes

app.post('/api/movies', addMovie);
app.get('/api/movies', getAllMovies);
app.get('/api/movies/:movie_id', getSingleMovie);
app.patch('/api/movies/', editMovie);
app.delete('/api/movies/:movie_id', deleteMovie);

//open ai sugestion
app.get('/api/movies/openai/getRecommendation', movieRecomendation);

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
