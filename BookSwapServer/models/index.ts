const mongoose = require('mongoose');
require('dotenv').config();
const DB_NAME = process.env.DB_NAME;
const DB_PORT = process.env.DB_PORT;

mongoose
  .connect(`mongodb://localhost:${DB_PORT}/${DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('connected to db'))
  .catch((error: any) => console.log(error));

export = mongoose;
