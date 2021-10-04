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
function getRequests(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = req.params.userId;
        try {
            const books = yield users_1.default.findOne({ _id: userId });
            res.status(200);
            res.send(books === null || books === void 0 ? void 0 : books.requests.sort((a, b) => b.timeStamp - a.timeStamp));
        }
        catch (e) {
            res.sendStatus(500);
        }
    });
}
function addOneRequest(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = req.params.userId;
        const requestToInsert = req.body;
        try {
            users_1.default.findOneAndUpdate({ _id: userId }, { $push: { requests: requestToInsert } }, { upsert: true });
            res.sendStatus(201);
        }
        catch (e) {
            res.sendStatus(500);
        }
    });
}
function changeViewedPropertyOfRequest(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // TODO: refactor so that it updates without doing a double operation
        // HOW TO USE IT : in the url I need to set first of all my target user (idUser), then the other user, finally I have to
        // specify if the target user is the sender or the receiver of the request and if I want to set hasBeenViewed to True or False
        const { idUser, idOtherUser, receiverOrSender, trueOrFalse } = req.params;
        try {
            const userInfos = yield users_1.default.findOne({ _id: idUser });
            if (userInfos) {
                for (const el of userInfos.requests) {
                    if ((receiverOrSender === 'receiver' ? el.userFrom : el.userTo) ===
                        idOtherUser) {
                        el.hasBeenViewed = trueOrFalse === 'true' ? true : false;
                    }
                }
            }
            // await userInfos.save();
            users_1.default.findOneAndUpdate({ _id: idUser }, { requests: userInfos === null || userInfos === void 0 ? void 0 : userInfos.requests });
            res.sendStatus(201);
        }
        catch (e) {
            res.sendStatus(500);
        }
    });
}
function deleteRequest(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // TODO: refactor so that it updates without doing a double operation
        // HOW TO USE IT : in the url I need to set first of all my target user (idUser), then the other user, finally I have to
        // specify if the target user is the sender or the receiver of the request that I want to delete
        const { idUser, idOtherUser, receiverOrSender } = req.params;
        try {
            const userInfos = yield users_1.default.findOne({ _id: idUser });
            const temp = userInfos === null || userInfos === void 0 ? void 0 : userInfos.requests.filter((request) => (receiverOrSender === 'receiver'
                ? request.userFrom
                : request.userTo) !== idOtherUser);
            users_1.default.findOneAndUpdate({ _id: idUser }, { requests: temp }).then();
            res.sendStatus(201);
        }
        catch (e) {
            res.sendStatus(500);
        }
    });
}
function changeStatusRequest(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // TODO: refactor so that it updates without doing a double operation
        const { idUser, idOtherUser, status, receiverOrSender } = req.params;
        try {
            const userInfos = yield users_1.default.findOne({ _id: idUser });
            if (userInfos) {
                for (const el of userInfos === null || userInfos === void 0 ? void 0 : userInfos.requests) {
                    if ((receiverOrSender === 'receiver' ? el.userFrom : el.userTo) ===
                        idOtherUser) {
                        el.status = status;
                    }
                }
            }
            users_1.default.findOneAndUpdate({ _id: idUser }, { requests: userInfos === null || userInfos === void 0 ? void 0 : userInfos.requests });
            res.sendStatus(201);
        }
        catch (e) {
            res.sendStatus(500);
        }
    });
}
exports.default = {
    getRequests,
    addOneRequest,
    changeViewedPropertyOfRequest,
    deleteRequest,
    changeStatusRequest,
};
