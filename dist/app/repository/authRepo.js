"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const haspPassword_1 = require("../../utlis/haspPassword");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userModel_1 = __importDefault(require("../model/userModel"));
class AuthRepository {
    constructor() {
        this.findByEmail = async (email) => {
            try {
                const user = await userModel_1.default.findOne({ email }).exec();
                console.log("login", user);
                return user;
            }
            catch (error) {
                console.log("Error finding user in repo", error);
                return null;
            }
        };
        this.save = async (data) => {
            try {
                let pass;
                if (data.password) {
                    pass = await (0, haspPassword_1.hashPassword)(data.password);
                }
                const newUser = new userModel_1.default({
                    ...data,
                    password: pass,
                });
                const savedUser = await newUser.save();
                console.log("data save????????");
                return savedUser ? savedUser : null;
            }
            catch (error) {
                console.log("Error finding user in repo", error);
                return null;
            }
        };
        this.findUser = async (email, password) => {
            try {
                const user = await userModel_1.default.findOne({ email }).exec();
                if (!user) {
                    return null;
                }
                const isPasswordMatch = await bcryptjs_1.default.compare(password, user.password);
                if (!isPasswordMatch) {
                    return null;
                }
                return user;
            }
            catch (error) {
                console.log("Error finding user in repo", error);
                return null;
            }
        };
    }
}
exports.default = AuthRepository;
