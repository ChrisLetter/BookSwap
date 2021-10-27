import mongoose from './';
const Schema = mongoose.Schema;

const ISBNSchema = new Schema({
  ISBN: Number,
  UsersThatWantIt: Array,
  UsersThatWantToSellIt: Array,
});

const ISBNdb = mongoose.model('ISBN', ISBNSchema);

export = ISBNdb;
