"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const authController_1 = __importDefault(require("../controller/authController"));
const authRouter = express_1.default.Router();
exports.authRouter = authRouter;
const authController = new authController_1.default();
authRouter.post('/signup', authController.signup);
authRouter.post('/verifyOtp', authController.OtpVerify);
authRouter.post('/resendOtp', authController.resendOtp);
authRouter.post('/login', authController.login);
