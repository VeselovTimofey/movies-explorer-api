require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const myError = require('./middlewares/error');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/rate_limit');
const checkCORS = require('./middlewares/CORSAllowed');
const { DEV_PATHDB, PORT } = require('./conf');

const { NODE_ENV, PATHDB } = process.env;

const app = express();

app.use(express.json());
app.use(checkCORS);
app.use(helmet());
app.use(limiter);

mongoose.connect(NODE_ENV === 'production' ? PATHDB : DEV_PATHDB, {});

app.use(requestLogger);

app.use('/', require('./routes/index'));

app.use(errorLogger);
app.use(errors());
app.use(myError);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
