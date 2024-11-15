"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOtpEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = __importDefault(require("../config/config"));
const transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: config_1.default.EMAIL_NODEMAILER,
        pass: config_1.default.PASSWORD_NODEMAILER
    },
});
const sendOtpEmail = async (to, otp) => {
    const mailOptions = {
        from: config_1.default.EMAIL_NODEMAILER,
        to,
        subject: "Your OTP Code",
        text: `Your OTP code is ${otp}`,
        html: `
        <div style="font-family: Arial, sans-serif; text-align: center;">
            <div style="background-color: #f7f7f7; padding: 20px;">
                <img src="data:image/png;base64" alt="Book Seller" style="width: 150px; height: auto;">
            </div>
            <div style="padding: 20px;">
                <h1 style="color: #333;">Your OTP Code</h1>
                <p style="font-size: 16px; color: #555;">Dear user,</p>
                <p style="font-size: 16px; color: #555;">Your OTP code is <strong style="font-size: 24px;">${otp}</strong></p>
                <p style="font-size: 16px; color: #555;">Please use this code to complete your verification process.</p>
                <p style="font-size: 16px; color: #555;">Thank you,</p>
                <p style="font-size: 16px; color: #555;">The seller-book</p>
            </div>
            <div style="background-color: #f7f7f7; padding: 20px;">
                <p style="font-size: 14px; color: #999;">&copy; 2024 Your Company. All rights reserved.</p>
                <p style="font-size: 14px; color: #999;"><a href="sreeharisree105@gmail.com" style="color: #0073e6;">sreeharisree105@gmail.com</a></p>
            </div>
        </div>
    `,
    };
    try {
        console.log("Mail sent to ", to);
        await transporter.sendMail(mailOptions);
        return true;
    }
    catch (error) {
        console.error("Error sending OTP", error);
        throw new Error("Failed to send OTP email");
    }
};
exports.sendOtpEmail = sendOtpEmail;
