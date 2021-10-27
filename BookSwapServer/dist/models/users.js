"use strict";
var mongoose = require('./');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
    username: String,
    email: String,
    password: String,
    booksToSell: Array,
    booksToBuy: Array,
    requests: Array,
    messages: Array,
});
var User = mongoose.model('User', UserSchema);
module.exports = User;
