import mongoose from './';
const Schema = mongoose.Schema;
import { IUser } from '../types'
import { model } from 'mongoose';

const UserSchema = new Schema({
  username: String,
  email: String,
  password: String,
  booksToSell: Array,
  booksToBuy: Array,
  requests: Array,
  messages: Array,
});

const UserModel = model<IUser>('User',UserSchema);

module.exports = UserModel;