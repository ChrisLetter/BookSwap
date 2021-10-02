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
const users_1 = __importDefault(require("../models/users"));
function getAllBooks(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userId, source } = req.params;
        try {
            // MIGUEL WAS DEFINETLY HERE!!
            // magidkdkjdjkd
            const books = yield users_1.default.findOne({ _id: userId });
            const booksToSell = books === null || books === void 0 ? void 0 : books.booksToSell;
            const booksToBuy = books === null || books === void 0 ? void 0 : books.booksToBuy;
            res.status(200);
            if (source === 'library') {
                res.send(booksToSell);
            }
            else if (source === 'wishList') {
                res.send(booksToBuy);
            }
            else if (source === 'all') {
                res.send({ booksToBuy, booksToSell });
            }
        }
        catch (e) {
            res.sendStatus(500);
        }
    });
}
function addOneBook(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userId, source } = req.params;
        const bookToInsert = req.body;
        try {
            source === 'library'
                ? users_1.default.findOneAndUpdate({ _id: userId }, { $push: { booksToSell: bookToInsert } }, { upsert: true }).then()
                : users_1.default.findOneAndUpdate({ _id: userId }, { $push: { booksToBuy: bookToInsert } }, { upsert: true }).then();
            res.sendStatus(201);
        }
        catch (e) {
            res.sendStatus(500);
        }
    });
}
function removeOneBook(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userId, ISBN, source } = req.params;
        try {
            // TODO: refactor so that it updates without doing a double operation
            const dbBooks = yield users_1.default.findOne({ _id: userId });
            source === 'library'
                ? users_1.default.findOneAndUpdate({ _id: userId }, {
                    booksToSell: dbBooks === null || dbBooks === void 0 ? void 0 : dbBooks.booksToSell.filter((books) => books.ISBN !== ISBN),
                }).then()
                : users_1.default.findOneAndUpdate({ _id: userId }, {
                    booksToBuy: dbBooks === null || dbBooks === void 0 ? void 0 : dbBooks.booksToBuy.filter((books) => books.ISBN !== ISBN),
                }).then();
            // TODO: set the right status
            res.sendStatus(201);
        }
        catch (e) {
            res.sendStatus(500);
        }
    });
}
exports.default = { getAllBooks, addOneBook, removeOneBook };
