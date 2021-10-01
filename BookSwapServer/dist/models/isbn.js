"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const _1 = __importDefault(require("./"));
const Schema = _1.default.Schema;
const ISBNSchema = new Schema({
    ISBN: Number,
    UsersThatWantIt: Array,
    UsersThatWantToSellIt: Array,
});
const ISBNdb = (0, mongoose_1.model)('ISBN', ISBNSchema);
exports.default = ISBNdb;
