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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// const User = require('./../models/users');
const users_1 = __importDefault(require("../models/users"));
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, userPassword } = req.body;
    const user = yield users_1.default.findOne({ email });
    if (user) {
        return res
            .status(409)
            .send({ error: '409', message: 'Could not create an user' });
    }
    try {
        if (userPassword === '') {
            throw new Error();
        }
        const hash = yield bcrypt_1.default.hash(userPassword, 10);
        const newUser = new users_1.default(Object.assign(Object.assign({}, req.body), { password: hash }));
        const { _id } = yield newUser.save();
        const id = _id.toString();
        const accessToken = jsonwebtoken_1.default.sign({ _id }, 'v3ry!str0ngP4ss');
        res.status(201).send({ accessToken, id });
    }
    catch (error) {
        res.status(400).send({ error, message: 'Could not create user' });
    }
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, userPassword } = req.body;
    try {
        const user1 = yield users_1.default.findOne({ email });
        // let _id;
        // let password;
        if (user1) {
            const { _id, password } = user1;
            const validatedPass = yield bcrypt_1.default.compare(userPassword, password);
            if (!validatedPass) {
                throw new Error();
            }
            const id = _id.toString();
            const accessToken = jsonwebtoken_1.default.sign({ _id }, 'v3ry!str0ngP4ss');
            res.status(201).send({ accessToken, id });
        }
    }
    catch (error) {
        res
            .status(401)
            .send({ error: '401', message: 'Username or password is incorrect' });
    }
});
const getUsername = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const userInfos = yield users_1.default.findOne({ _id: userId });
        const username = userInfos === null || userInfos === void 0 ? void 0 : userInfos.username;
        res.status(201).send({ username });
    }
    catch (error) {
        res.status(500);
        // console.log(error);
    }
});
exports.default = { create, login, getUsername };
