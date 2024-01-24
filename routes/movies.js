const routerMovie = require('express').Router();
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const validationPostMovie = require('../validations/post_movie');
const validationDeleteMovie = require('../validations/delete_movie');

routerMovie.get('/', getMovies);
routerMovie.post('/', validationPostMovie, createMovie);
routerMovie.delete('/:movieId', validationDeleteMovie, deleteMovie);

module.exports = routerMovie;
