const mongoose = require('./');
const Schema = mongoose.Schema;

const ISBNSchema = new Schema({
  ISBN: Number,
  UsersThatWantsIt: Array,
  UsersThatWantToSellIt: Array,
});

const ISBNdb = mongoose.model('ISBN', ISBNSchema);

module.exports = ISBNdb;
