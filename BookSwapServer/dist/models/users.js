"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = __importDefault(require("./"));
const Schema = _1.default.Schema;
const mongoose_1 = require("mongoose");
const UserSchema = new Schema({
    username: String,
    email: String,
    password: String,
    booksToSell: Array,
    booksToBuy: Array,
    requests: Array,
    messages: Array,
});
const UserModel = (0, mongoose_1.model)('User', UserSchema);
exports.default = UserModel;
