const mongoose = require('mongoose');
const { dbName, dbPort } = require('../../config.js');

mongoose.connect(
  `mongodb://localhost:${dbPort}/${dbName}`,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) console.log(err);
    else console.log('connected to db');
  },
);

module.exports = mongoose;
