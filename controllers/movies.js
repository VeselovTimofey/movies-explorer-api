const mongoose = require('mongoose');
const Movie = require('../models/movie');
const BadRequest = require('../errors/bad_request');
const Forbidden = require('../errors/forbidden');
const NotFound = require('../errors/not_found');

const { BadRequestMessage, SomeOneElseMovieMessage, NotFoundMovieMessage } = require('../errors/const');

const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send({ data: movies }))
    .catch((err) => next(err));
};

const createMovie = (req, res, next) => {
  const {
    contry,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  const owner = req.user._id;

  Movie.create({
    contry,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner,
  })
    .then((movie) => res.send({ data: movie }))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequest(BadRequestMessage + err.message));
      } else {
        next(err);
      }
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId).orFail()
    .then((movie) => {
      if (req.user._id !== movie.owner._id.valueOf()) {
        throw new Forbidden(SomeOneElseMovieMessage);
      }
      Movie.findByIdAndDelete(req.params.movieId).orFail()
        .then((oldMovie) => {
          if (oldMovie) {
            res.send({ data: oldMovie });
          }
        })
        .catch((err) => {
          if (err instanceof mongoose.Error.DocumentNotFoundError) {
            next(new NotFound(NotFoundMovieMessage));
          } else {
            next(err);
          }
        });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        next(new NotFound(NotFoundMovieMessage));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getMovies, createMovie, deleteMovie,
};
