"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const enum_1 = require("../../interface/enum");
const generateOtp_1 = require("../../utlis/generateOtp");
const jwt_1 = require("../../utlis/jwt");
const sendOtpEmail_1 = require("../../utlis/sendOtpEmail");
const authRepo_1 = __importDefault(require("../repository/authRepo"));
const authRepo = new authRepo_1.default();
class AuthUseCase {
    constructor() {
        this.register = async (data) => {
            try {
                const emailExist = await authRepo.findByEmail(data.email);
                console.log("email exist", emailExist);
                if (emailExist) {
                    return { status: enum_1.StatusCode.Conflict, message: "Email already exist" };
                }
                const otp = await (0, generateOtp_1.generateOtp)();
                const sendMail = await (0, sendOtpEmail_1.sendOtpEmail)(data.email, otp);
                if (sendMail) {
                    return { status: enum_1.StatusCode.OK, message: "Otp send successfully", data: { otp } };
                }
                else {
                    return { status: enum_1.StatusCode.InternalServerError, message: "Failed to send OTP email" };
                }
            }
            catch (error) {
                console.log("Error registring in use-case", error);
                return { status: enum_1.StatusCode.InternalServerError, message: 'Internal server error' };
            }
        };
        this.verifyOtp = async (enteredOtp, otpFromCookie, data) => {
            try {
                if (enteredOtp != otpFromCookie) {
                    return { status: enum_1.StatusCode.Unauthorized, message: "Otp not match" };
                }
                console.log("sssss");
                const result = await authRepo.save(data);
                if (!result) {
                    return { status: enum_1.StatusCode.InternalServerError, message: "Cant save user data" };
                }
                console.log("-....>>");
                const token = await (0, jwt_1.createToken)(result._id);
                console.log(token);
                return { status: enum_1.StatusCode.Created, message: "Data saved !", data: { user: result, token } };
            }
            catch (error) {
                console.log("Error registring in use-case", error);
                return { status: enum_1.StatusCode.InternalServerError, message: 'Internal server error' };
            }
        };
        this.resendOtp = async (email) => {
            try {
                const otp = await (0, generateOtp_1.generateOtp)();
                const sendMail = await (0, sendOtpEmail_1.sendOtpEmail)(email, otp);
                if (sendMail) {
                    return { status: enum_1.StatusCode.OK, message: "Otp send successfully", data: { otp } };
                }
                else {
                    return { status: enum_1.StatusCode.InternalServerError, message: "Failed to send OTP email" };
                }
            }
            catch (error) {
                console.log("Error resend otp in use-case", error);
                return { status: enum_1.StatusCode.InternalServerError, message: 'Internal server error' };
            }
        };
        this.login = async (email, password) => {
            try {
                const result = await authRepo.findUser(email, password);
                if (!result) {
                    return { status: enum_1.StatusCode.NotFound, message: "Entered credientials are wrong !" };
                }
                const token = await (0, jwt_1.createToken)(result._id);
                return { status: enum_1.StatusCode.OK, message: "Login success", data: { user: result, token } };
            }
            catch (error) {
                console.log("Error login in use-case", error);
                return { status: enum_1.StatusCode.InternalServerError, message: 'Internal server error' };
            }
        };
    }
}
exports.default = AuthUseCase;
