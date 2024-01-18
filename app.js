require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const {
  PATHDB = 'mongodb://127.0.0.1:27017/bitfilmsdb',
  PORT = 3000,
} = process.env;
const app = express();

mongoose.connect(PATHDB, {});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
