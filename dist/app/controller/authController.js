"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const enum_1 = require("../../interface/enum");
const authUsecase_1 = __importDefault(require("../use-case/authUsecase"));
class AuthController {
    constructor() {
        this.signup = async (req, res) => {
            try {
                console.log(req.body);
                const { name, email, password } = req.body;
                if (!name || !email || !password) {
                    res.status(enum_1.StatusCode.NotAcceptable).json({ message: "Credientials are missing" });
                    return;
                }
                const data = { name, email, password };
                const response = await this.authUseCase.register(data);
                if (response.status === enum_1.StatusCode.OK) {
                    res.cookie('userData', data, {
                        httpOnly: true,
                        secure: true,
                        maxAge: 3600000
                    });
                    res.cookie('otp', response.data?.otp, {
                        httpOnly: true,
                        secure: true,
                        maxAge: 60000
                    });
                }
                res.status(response.status).json({ message: response.message });
            }
            catch (error) {
                console.log("Error signup", error);
                res.status(enum_1.StatusCode.InternalServerError).json({ message: 'Internal server error' });
            }
        };
        this.OtpVerify = async (req, res) => {
            try {
                const { otp: enteredOtp } = req.body;
                const otpFromCookie = Number(req.cookies.otp);
                if (!otpFromCookie) {
                    res.status(enum_1.StatusCode.BadRequest).json({ message: 'OTP not found in cookies' });
                    return;
                }
                const userData = req.cookies.userData;
                if (!userData) {
                    res.status(enum_1.StatusCode.BadRequest).json({ message: 'User data not found in cookies' });
                    return;
                }
                const response = await this.authUseCase.verifyOtp(enteredOtp, otpFromCookie, userData);
                if (response.data?.token) {
                    res.cookie('token', response.data.token, {
                        httpOnly: true,
                        secure: true,
                        maxAge: 3600000
                    });
                    res.clearCookie('userData', {
                        httpOnly: true,
                        secure: true,
                    });
                }
                res.status(response.status).json({ message: response.message, data: response.data });
            }
            catch (error) {
                console.log("Error verifying", error);
                res.status(enum_1.StatusCode.InternalServerError).json({ message: 'Internal server error' });
            }
        };
        this.resendOtp = async (req, res) => {
            try {
                const { email } = req.cookies.userData;
                console.log("resend", email);
                const response = await this.authUseCase.resendOtp(email);
                res.cookie('otp', response.data?.otp, {
                    httpOnly: true,
                    secure: true,
                    maxAge: 60000
                });
                res.status(response.status).json({ message: response.message });
            }
            catch (error) {
                console.log("Error resend otp", error);
                res.status(enum_1.StatusCode.InternalServerError).json({ message: 'Internal server error' });
            }
        };
        this.login = async (req, res) => {
            try {
                const { email, password } = req.body;
                if (!email || !password) {
                    res.status(enum_1.StatusCode.NotAcceptable).json({ message: "Credientials are missing" });
                    return;
                }
                const response = await this.authUseCase.login(email, password);
                if (response.data?.token) {
                    res.cookie('token', response.data.token, {
                        httpOnly: true,
                        secure: true,
                        maxAge: 3600000
                    });
                }
                res.status(response.status).json({ message: response.message, data: response.data });
            }
            catch (error) {
                console.log("Error login", error);
                res.status(enum_1.StatusCode.InternalServerError).json({ message: 'Internal server error' });
            }
        };
        this.authUseCase = new authUsecase_1.default();
    }
}
exports.default = AuthController;
