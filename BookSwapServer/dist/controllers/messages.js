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
function getAllMessages(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var idUser, userInfos, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    idUser = req.params.idUser;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, User.findOne({ _id: idUser })];
                case 2:
                    userInfos = _a.sent();
                    res.status(200);
                    res.send(userInfos.messages.reverse());
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
function addMessage(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, idUser, idOtherUser, otherUsername, messageInfos, allUserInfos, prevUserMsgs, msgToChange, otherMessagesToKeep, msgToInsert, e_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.params, idUser = _a.idUser, idOtherUser = _a.idOtherUser, otherUsername = _a.otherUsername;
                    messageInfos = req.body;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, User.findOne({ _id: idUser })];
                case 2:
                    allUserInfos = _b.sent();
                    prevUserMsgs = allUserInfos.messages;
                    msgToChange = prevUserMsgs.filter(function (msg) { return msg.otherUser === idOtherUser; });
                    otherMessagesToKeep = prevUserMsgs.filter(function (msg) { return msg.otherUser !== idOtherUser; });
                    if (msgToChange.length === 0) {
                        msgToInsert = {
                            otherUser: idOtherUser,
                            otherUsername: otherUsername,
                            msgs: [messageInfos],
                            lastMessage: messageInfos.timeStamp,
                            notification: false,
                        };
                        otherMessagesToKeep.push(msgToInsert);
                    }
                    else {
                        msgToChange[0].msgs.push(messageInfos);
                        msgToChange[0].lastMessage = messageInfos.timeStamp;
                        otherMessagesToKeep.push(msgToChange[0]);
                    }
                    return [4 /*yield*/, User.findOneAndUpdate({ _id: idUser }, { messages: otherMessagesToKeep }).then(function () {
                            res.sendStatus(201);
                        })];
                case 3:
                    _b.sent();
                    return [3 /*break*/, 5];
                case 4:
                    e_2 = _b.sent();
                    console.log(e_2);
                    res.sendStatus(500);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function toggleNotificationChat(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, idUser, idOtherUser, trueOrFalse, allUserInfos, prevUserMsgs, msgToChange, otherMessagesToKeep, e_3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.params, idUser = _a.idUser, idOtherUser = _a.idOtherUser, trueOrFalse = _a.trueOrFalse;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, User.findOne({ _id: idUser })];
                case 2:
                    allUserInfos = _b.sent();
                    prevUserMsgs = allUserInfos.messages;
                    msgToChange = prevUserMsgs.filter(function (msg) { return msg.otherUser === idOtherUser; });
                    otherMessagesToKeep = prevUserMsgs.filter(function (msg) { return msg.otherUser !== idOtherUser; });
                    trueOrFalse === 'true'
                        ? (msgToChange[0].notification = true)
                        : (msgToChange[0].notification = false);
                    otherMessagesToKeep.push(msgToChange[0]);
                    User.findOneAndUpdate({ _id: idUser }, { messages: otherMessagesToKeep }).then(function () { });
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
module.exports = {
    getAllMessages: getAllMessages,
    addMessage: addMessage,
    toggleNotificationChat: toggleNotificationChat,
};
