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
const users_js_1 = __importDefault(require("../models/users.js"));
const users_1 = __importDefault(require("../models/users"));
function getAllMessages(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { idUser } = req.params;
        try {
            const userInfos = yield users_1.default.findOne({ _id: idUser });
            res.status(200);
            res.send(userInfos === null || userInfos === void 0 ? void 0 : userInfos.messages.reverse());
        }
        catch (e) {
            // console.log(e);
            res.sendStatus(500);
        }
    });
}
function addMessage(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { idUser, idOtherUser, otherUsername } = req.params;
        const messageInfos = req.body;
        try {
            const allUserInfos = yield users_1.default.findOne({ _id: idUser });
            if (allUserInfos) {
                const prevUserMsgs = allUserInfos.messages;
                const msgToChange = prevUserMsgs.filter((msg) => msg.otherUser === idOtherUser);
                const otherMessagesToKeep = prevUserMsgs.filter((msg) => msg.otherUser !== idOtherUser);
                if (msgToChange.length === 0) {
                    const msgToInsert = {
                        otherUser: idOtherUser,
                        otherUsername,
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
                yield users_js_1.default.findOneAndUpdate({ _id: idUser }, { messages: otherMessagesToKeep }).then(() => {
                    res.sendStatus(201);
                });
            }
        }
        catch (e) {
            // console.log(e);
            res.sendStatus(500);
        }
    });
}
function toggleNotificationChat(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { idUser, idOtherUser, trueOrFalse } = req.params;
        try {
            const allUserInfos = yield users_1.default.findOne({ _id: idUser });
            const prevUserMsgs = allUserInfos === null || allUserInfos === void 0 ? void 0 : allUserInfos.messages;
            const msgToChange = prevUserMsgs === null || prevUserMsgs === void 0 ? void 0 : prevUserMsgs.filter((msg) => msg.otherUser === idOtherUser);
            const otherMessagesToKeep = prevUserMsgs === null || prevUserMsgs === void 0 ? void 0 : prevUserMsgs.filter((msg) => msg.otherUser !== idOtherUser);
            if (msgToChange) {
                if (trueOrFalse === 'true') {
                    msgToChange[0].notification = true;
                }
                else {
                    msgToChange[0].notification = false;
                }
                otherMessagesToKeep === null || otherMessagesToKeep === void 0 ? void 0 : otherMessagesToKeep.push(msgToChange[0]);
            }
            users_js_1.default.findOneAndUpdate({ _id: idUser }, { messages: otherMessagesToKeep });
            res.sendStatus(201);
        }
        catch (e) {
            // console.log(e);
            res.sendStatus(500);
        }
    });
}
exports.default = {
    getAllMessages,
    addMessage,
    toggleNotificationChat,
};
