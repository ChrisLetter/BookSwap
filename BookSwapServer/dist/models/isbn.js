"use strict";
var mongoose = require('./');
var Schema = mongoose.Schema;
var ISBNSchema = new Schema({
    ISBN: Number,
    UsersThatWantIt: Array,
    UsersThatWantToSellIt: Array,
});
var ISBNdb = mongoose.model('ISBN', ISBNSchema);
module.exports = ISBNdb;
