"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const createToken = (userId) => {
    const token = jsonwebtoken_1.default.sign({ userId: userId.toString() }, config_1.default.SECRET_KEY, { expiresIn: '1h' });
    return token;
};
exports.createToken = createToken;
