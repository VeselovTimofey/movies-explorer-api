const { celebrate, Joi } = require('celebrate');

module.exports = celebrate({
  body: Joi.object().keys({
    contry: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().regex(/^https?:\/\/w?w?w?\.?[a-z0-9-._~:/?#[\]@!$&'()*+,;=]{5,}#?/).required(),
    trailerLink: Joi.string().regex(/^https?:\/\/w?w?w?\.?[a-z0-9-._~:/?#[\]@!$&'()*+,;=]{5,}#?/).required(),
    thumbnail: Joi.string().regex(/^https?:\/\/w?w?w?\.?[a-z0-9-._~:/?#[\]@!$&'()*+,;=]{5,}#?/).required(),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});
