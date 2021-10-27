const mongoose = require('mongoose');
require('dotenv').config();
const DB_NAME = process.env.DB_NAME;
const DB_PORT = process.env.DB_PORT;

mongoose.connect(
  `mongodb://localhost:${DB_PORT}/${DB_NAME}`,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('connected to db');
    }
  },
);

export = mongoose;
