"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = __importDefault(require("./"));
var Schema = _1.default.Schema;
var ISBNSchema = new Schema({
    ISBN: Number,
    UsersThatWantIt: Array,
    UsersThatWantToSellIt: Array,
});
var ISBNdb = _1.default.model('ISBN', ISBNSchema);
module.exports = ISBNdb;
