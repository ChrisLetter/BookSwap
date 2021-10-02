import { model } from "mongoose";
import mongoose from './';
const Schema = mongoose.Schema;
import { ISBN } from "../types";

const ISBNSchema = new Schema({
  ISBN: Number,
  UsersThatWantIt: Array,
  UsersThatWantToSellIt: Array,
});

const ISBNdb = model<ISBN>('ISBN', ISBNSchema);

export default ISBNdb;