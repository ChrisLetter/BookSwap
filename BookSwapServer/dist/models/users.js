"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = __importDefault(require("./"));
var Schema = _1.default.Schema;
var UserSchema = new Schema({
    username: String,
    email: String,
    password: String,
    booksToSell: Array,
    booksToBuy: Array,
    requests: Array,
    messages: Array,
});
var User = _1.default.model('User', UserSchema);
module.exports = User;
