"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const configServer_1 = require("../configServer");
mongoose_1.default.connect(`mongodb://localhost:${configServer_1.dbPort}/${configServer_1.dbName}`);
exports.default = mongoose_1.default;
