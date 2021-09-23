const mongoose = require('./');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  email: String,
  password: String,
  booksToSell: Array,
  booksToBuy: Array,
  requests: Array,
  messages: Array,
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
