"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var User = require('./../models/users');
require('dotenv').config();
var SECRET_KEY = process.env.SECRET_KEY;
var create = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, userPassword, user, hash, newUser, _id, id, accessToken, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, userPassword = _a.userPassword;
                return [4 /*yield*/, User.findOne({ email: email })];
            case 1:
                user = _b.sent();
                if (user) {
                    return [2 /*return*/, res
                            .status(409)
                            .send({ error: '409', message: 'Could not create an user' })];
                }
                _b.label = 2;
            case 2:
                _b.trys.push([2, 5, , 6]);
                if (userPassword === '') {
                    throw new Error();
                }
                return [4 /*yield*/, bcrypt.hash(userPassword, 10)];
            case 3:
                hash = _b.sent();
                newUser = new User(__assign(__assign({}, req.body), { password: hash }));
                return [4 /*yield*/, newUser.save()];
            case 4:
                _id = (_b.sent())._id;
                id = _id.toString();
                accessToken = jwt.sign({ _id: _id }, SECRET_KEY);
                res.status(201).send({ accessToken: accessToken, id: id });
                return [3 /*break*/, 6];
            case 5:
                error_1 = _b.sent();
                res.status(400).send({ error: error_1, message: 'Could not create user' });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, userPassword, _b, _id, password, validatedPass, id, accessToken, error_2;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.body, email = _a.email, userPassword = _a.userPassword;
                _c.label = 1;
            case 1:
                _c.trys.push([1, 4, , 5]);
                return [4 /*yield*/, User.findOne({ email: email })];
            case 2:
                _b = _c.sent(), _id = _b._id, password = _b.password;
                return [4 /*yield*/, bcrypt.compare(userPassword, password)];
            case 3:
                validatedPass = _c.sent();
                if (!validatedPass) {
                    throw new Error();
                }
                id = _id.toString();
                accessToken = jwt.sign({ _id: _id }, SECRET_KEY);
                res.status(201).send({ accessToken: accessToken, id: id });
                return [3 /*break*/, 5];
            case 4:
                error_2 = _c.sent();
                res
                    .status(401)
                    .send({ error: '401', message: 'Username or password is incorrect' });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
var getUsername = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, userInfos, username, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.params.userId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, User.findOne({ _id: userId })];
            case 2:
                userInfos = _a.sent();
                username = userInfos.username;
                res.status(201).send({ username: username });
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                res.status(500);
                console.log(error_3);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
module.exports = { create: create, login: login, getUsername: getUsername };
