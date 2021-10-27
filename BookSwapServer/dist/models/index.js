"use strict";
var mongoose = require('mongoose');
require('dotenv').config();
var DB_NAME = process.env.DB_NAME;
var DB_PORT = process.env.DB_PORT;
mongoose.connect("mongodb://localhost:" + DB_PORT + "/" + DB_NAME, { useNewUrlParser: true, useUnifiedTopology: true }, function (err) {
    if (err) {
        console.log(err);
    }
    else {
        console.log('connected to db');
    }
});
module.exports = mongoose;
