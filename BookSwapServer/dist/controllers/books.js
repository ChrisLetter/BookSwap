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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var User = require('../models/users.js');
var ISBNdb = require('../models/isbn');
function getAllBooks(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, userId, source, books_1, booksToSell, booksToBuy, e_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.params, userId = _a.userId, source = _a.source;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, User.findOne({ _id: userId })];
                case 2:
                    books_1 = _b.sent();
                    booksToSell = books_1.booksToSell;
                    booksToBuy = books_1.booksToBuy;
                    res.status(200);
                    if (source === 'library') {
                        res.send(booksToSell);
                    }
                    else if (source === 'wishList') {
                        res.send(booksToBuy);
                    }
                    else if (source === 'all') {
                        res.send({ booksToBuy: booksToBuy, booksToSell: booksToSell });
                    }
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _b.sent();
                    console.log(e_1);
                    res.sendStatus(500);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function addOneBook(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, userId, source, bookToInsert;
        return __generator(this, function (_b) {
            _a = req.params, userId = _a.userId, source = _a.source;
            bookToInsert = req.body;
            try {
                source === 'library'
                    ? User.findOneAndUpdate({ _id: userId }, { $push: { booksToSell: bookToInsert } }, { upsert: true }).then(function () { })
                    : User.findOneAndUpdate({ _id: userId }, { $push: { booksToBuy: bookToInsert } }, { upsert: true }).then(function () { });
                res.sendStatus(201);
            }
            catch (e) {
                console.log(e);
                res.sendStatus(500);
            }
            return [2 /*return*/];
        });
    });
}
function removeOneBook(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, userId, ISBN, source, dbBooks, e_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.params, userId = _a.userId, ISBN = _a.ISBN, source = _a.source;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, User.findOne({ _id: userId })];
                case 2:
                    dbBooks = _b.sent();
                    source === 'library'
                        ? User.findOneAndUpdate({ _id: userId }, {
                            booksToSell: dbBooks.booksToSell.filter(function (books) { return books.ISBN !== ISBN; }),
                        }).then(function () { })
                        : User.findOneAndUpdate({ _id: userId }, {
                            booksToBuy: dbBooks.booksToBuy.filter(function (books) { return books.ISBN !== ISBN; }),
                        }).then(function () { });
                    // TODO: set the right status
                    res.sendStatus(201);
                    return [3 /*break*/, 4];
                case 3:
                    e_2 = _b.sent();
                    console.log(e_2);
                    res.sendStatus(500);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function getBestMatches(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, allBooks, ISBNbooksToSell, ISBNbooksToBuy, matches, _i, ISBNbooksToSell_1, isbnCode, usersList, _a, ISBNbooksToBuy_1, isbnCode, usersList, freq, _b, matches_1, el, sorted, _c, sorted_1, el, username, e_3;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 14, , 15]);
                    userId = req.params.userId;
                    return [4 /*yield*/, User.findOne({ _id: userId })];
                case 1:
                    allBooks = _d.sent();
                    ISBNbooksToSell = allBooks.booksToSell.map(function (book) { return book.ISBN; });
                    ISBNbooksToBuy = allBooks.booksToBuy.map(function (book) { return book.ISBN; });
                    matches = [];
                    _i = 0, ISBNbooksToSell_1 = ISBNbooksToSell;
                    _d.label = 2;
                case 2:
                    if (!(_i < ISBNbooksToSell_1.length)) return [3 /*break*/, 5];
                    isbnCode = ISBNbooksToSell_1[_i];
                    return [4 /*yield*/, ISBNdb.findOne({ ISBN: isbnCode })];
                case 3:
                    usersList = _d.sent();
                    matches.push.apply(matches, usersList.UsersThatWantIt);
                    _d.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 2];
                case 5:
                    _a = 0, ISBNbooksToBuy_1 = ISBNbooksToBuy;
                    _d.label = 6;
                case 6:
                    if (!(_a < ISBNbooksToBuy_1.length)) return [3 /*break*/, 9];
                    isbnCode = ISBNbooksToBuy_1[_a];
                    return [4 /*yield*/, ISBNdb.findOne({ ISBN: isbnCode })];
                case 7:
                    usersList = _d.sent();
                    matches.push.apply(matches, usersList.UsersThatWantToSellIt);
                    _d.label = 8;
                case 8:
                    _a++;
                    return [3 /*break*/, 6];
                case 9:
                    freq = {};
                    for (_b = 0, matches_1 = matches; _b < matches_1.length; _b++) {
                        el = matches_1[_b];
                        if (Object.keys(freq).includes(el)) {
                            freq[el] += 1;
                        }
                        else {
                            freq[el] = 1;
                        }
                    }
                    sorted = Object.entries(freq).sort(function (_a, _b) {
                        var a = _a[1];
                        var b = _b[1];
                        return b - a;
                    });
                    _c = 0, sorted_1 = sorted;
                    _d.label = 10;
                case 10:
                    if (!(_c < sorted_1.length)) return [3 /*break*/, 13];
                    el = sorted_1[_c];
                    return [4 /*yield*/, User.findOne({ _id: el[0] })];
                case 11:
                    username = (_d.sent()).username;
                    el.push(username);
                    _d.label = 12;
                case 12:
                    _c++;
                    return [3 /*break*/, 10];
                case 13:
                    res.status(201).send({ sorted: sorted });
                    return [3 /*break*/, 15];
                case 14:
                    e_3 = _d.sent();
                    console.log(e_3);
                    res.sendStatus(500);
                    return [3 /*break*/, 15];
                case 15: return [2 /*return*/];
            }
        });
    });
}
module.exports = { getAllBooks: getAllBooks, addOneBook: addOneBook, removeOneBook: removeOneBook, getBestMatches: getBestMatches };
