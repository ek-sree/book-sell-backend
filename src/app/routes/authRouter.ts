import express from 'express';
import AuthController from '../controller/authController';

const authRouter = express.Router() 

const authController = new AuthController()

authRouter.post('/signup', authController.signup);
authRouter.post('/verifyOtp', authController.OtpVerify);
authRouter.post('/resendOtp', authController.resendOtp)
authRouter.post('/login', authController.login)


export {authRouter}