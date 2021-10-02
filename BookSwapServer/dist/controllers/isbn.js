"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isbn_1 = __importDefault(require("../models/isbn"));
function addUserToTheIsbnList(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userId, ISBN, source } = req.params;
        try {
            source === 'sell'
                ? isbn_1.default.findOneAndUpdate({ ISBN }, { $push: { UsersThatWantToSellIt: userId } }, { upsert: true })
                : isbn_1.default.findOneAndUpdate({ ISBN }, { $push: { UsersThatWantIt: userId } }, { upsert: true });
            res.sendStatus(201);
        }
        catch (e) {
            // console.log(e);
            res.sendStatus(500);
        }
    });
}
function removeUserFromTheIsbnList(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userId, ISBN, source } = req.params;
        try {
            source === 'sell'
                ? isbn_1.default.findOneAndUpdate({ ISBN }, { $pull: { UsersThatWantToSellIt: userId } })
                : isbn_1.default.findOneAndUpdate({ ISBN }, { $pull: { UsersThatWantIt: userId } });
            res.sendStatus(201);
        }
        catch (e) {
            // console.log(e);
            res.sendStatus(500);
        }
    });
}
function getAllUsersOfISBN(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const ISBN = req.params.ISBN;
        try {
            const usersList = yield isbn_1.default.findOne({ ISBN });
            res.status(200);
            res.send(usersList);
        }
        catch (e) {
            res.sendStatus(500);
        }
    });
}
exports.default = {
    addUserToTheIsbnList,
    removeUserFromTheIsbnList,
    getAllUsersOfISBN,
};
