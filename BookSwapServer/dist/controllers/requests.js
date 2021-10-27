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
var User = require('../models/users');
function getRequests(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, books, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userId = req.params.userId;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, User.findOne({ _id: userId })];
                case 2:
                    books = _a.sent();
                    res.status(200);
                    res.send(books.requests.sort(function (a, b) { return b.timeStamp - a.timeStamp; }));
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    console.log(e_1);
                    res.sendStatus(500);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function addOneRequest(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, requestToInsert;
        return __generator(this, function (_a) {
            userId = req.params.userId;
            requestToInsert = req.body;
            try {
                User.findOneAndUpdate({ _id: userId }, { $push: { requests: requestToInsert } }, { upsert: true }).then(function () { });
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
function changeViewedPropertyOfRequest(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, idUser, idOtherUser, receiverOrSender, trueOrFalse, userInfos, _i, _b, el, e_2;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _a = req.params, idUser = _a.idUser, idOtherUser = _a.idOtherUser, receiverOrSender = _a.receiverOrSender, trueOrFalse = _a.trueOrFalse;
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, User.findOne({ _id: idUser })];
                case 2:
                    userInfos = _c.sent();
                    for (_i = 0, _b = userInfos.requests; _i < _b.length; _i++) {
                        el = _b[_i];
                        if ((receiverOrSender === 'receiver' ? el.userFrom : el.userTo) ===
                            idOtherUser) {
                            el.hasBeenViewed = trueOrFalse === 'true' ? true : false;
                        }
                    }
                    // await userInfos.save();
                    User.findOneAndUpdate({ _id: idUser }, { requests: userInfos.requests }).then(function () { });
                    res.sendStatus(201);
                    return [3 /*break*/, 4];
                case 3:
                    e_2 = _c.sent();
                    console.log(e_2);
                    res.sendStatus(500);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function deleteRequest(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, idUser, idOtherUser, receiverOrSender, userInfos, temp, e_3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.params, idUser = _a.idUser, idOtherUser = _a.idOtherUser, receiverOrSender = _a.receiverOrSender;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, User.findOne({ _id: idUser })];
                case 2:
                    userInfos = _b.sent();
                    temp = userInfos.requests.filter(function (request) {
                        return (receiverOrSender === 'receiver'
                            ? request.userFrom
                            : request.userTo) !== idOtherUser;
                    });
                    User.findOneAndUpdate({ _id: idUser }, { requests: temp }).then(function () { });
                    res.sendStatus(201);
                    return [3 /*break*/, 4];
                case 3:
                    e_3 = _b.sent();
                    console.log(e_3);
                    res.sendStatus(500);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function changeStatusRequest(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, idUser, idOtherUser, status, receiverOrSender, userInfos, _i, _b, el, e_4;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _a = req.params, idUser = _a.idUser, idOtherUser = _a.idOtherUser, status = _a.status, receiverOrSender = _a.receiverOrSender;
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, User.findOne({ _id: idUser })];
                case 2:
                    userInfos = _c.sent();
                    for (_i = 0, _b = userInfos.requests; _i < _b.length; _i++) {
                        el = _b[_i];
                        if ((receiverOrSender === 'receiver' ? el.userFrom : el.userTo) ===
                            idOtherUser) {
                            el.status = status;
                        }
                    }
                    User.findOneAndUpdate({ _id: idUser }, { requests: userInfos.requests }).then(function () { });
                    res.sendStatus(201);
                    return [3 /*break*/, 4];
                case 3:
                    e_4 = _c.sent();
                    console.log(e_4);
                    res.sendStatus(500);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
module.exports = {
    getRequests: getRequests,
    addOneRequest: addOneRequest,
    changeViewedPropertyOfRequest: changeViewedPropertyOfRequest,
    deleteRequest: deleteRequest,
    changeStatusRequest: changeStatusRequest,
};
