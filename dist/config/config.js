"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = {
    port: process.env.PORT || 3000,
    DB_URI: process.env.DB_URI || '',
    EMAIL_NODEMAILER: process.env.EMAIL_NODEMAILER || '',
    PASSWORD_NODEMAILER: process.env.PASSWORD_NODEMAILER || '',
    SECRET_KEY: process.env.SECRET_KEY || ''
};
exports.default = config;
