import { Request, Response } from "express";
import { StatusCode } from "../../interface/enum";
import AuthUseCase from "../use-case/authUsecase";

export default class AuthController {
    private authUseCase: AuthUseCase;

    constructor() {
        this.authUseCase = new AuthUseCase();
    }

    signup = async(req: Request, res: Response): Promise<void> =>{
        try {
            console.log(req.body);
            const {name, email,password} = req.body
            if(!name || !email || !password){
                 res.status(StatusCode.NotAcceptable).json({message:"Credientials are missing"})
                 return
            }
            const data = {name,email,password}
            const response = await this.authUseCase.register(data)
            if (response.status === StatusCode.OK) {
                res.cookie('userData', data, { 
                    httpOnly: true, 
                    secure: true,
                    maxAge: 3600000
                });
                res.cookie('otp', response.data?.otp,{
                    httpOnly:true,
                    secure:true,
                    maxAge: 60000
                })
            }
            res.status(response.status).json({ message: response.message });
        } catch (error) {
            console.log("Error signup",error);
            res.status(StatusCode.InternalServerError).json({ message: 'Internal server error' });
        }
    }


    OtpVerify = async(req:Request, res:Response): Promise<void> =>{
        try {
            
            const { otp: enteredOtp } = req.body;
            const otpFromCookie = Number(req.cookies.otp);

            if (!otpFromCookie) {
                res.status(StatusCode.BadRequest).json({ message: 'OTP not found in cookies' });
                return;
            }

            const userData = req.cookies.userData;
            if (!userData) {
                res.status(StatusCode.BadRequest).json({ message: 'User data not found in cookies' });
                return;
            }

            const response = await this.authUseCase.verifyOtp(enteredOtp,otpFromCookie,userData)
            if(response.data?.token){
                res.cookie('token',response.data.token,{
                    httpOnly:true,
                    secure:true,
                    maxAge:3600000
                })

                res.clearCookie('userData', {
                    httpOnly: true, 
                    secure: true,    
                });
            }

             res.status(response.status).json({message:response.message, data:response.data})
        } catch (error) {
            console.log("Error verifying",error);
            res.status(StatusCode.InternalServerError).json({ message: 'Internal server error' });
        }
    }


    resendOtp =async(req:Request, res:Response):Promise<void>=>{
        try {
            const {email} = req.cookies.userData
            console.log("resend",email);
            
            const response = await this.authUseCase.resendOtp(email)
            res.cookie('otp', response.data?.otp,{
                httpOnly:true,
                secure:true,
                maxAge: 60000
            })
            res.status(response.status).json({message:response.message});
        } catch (error) {
            console.log("Error resend otp",error);
            res.status(StatusCode.InternalServerError).json({ message: 'Internal server error' });
        }
    }

    login = async(req: Request, res: Response): Promise<void> =>{
        try {
            const {email, password} = req.body;
            if(!email || !password){
                res.status(StatusCode.NotAcceptable).json({message:"Credientials are missing"})
                return
            }
            const response = await this.authUseCase.login(email,password)
            if(response.data?.token){
                res.cookie('token',response.data.token,{
                    httpOnly:true,
                    secure:true,
                    maxAge:3600000
                })
            }
            res.status(response.status).json({message: response.message, data:response.data});
        } catch (error) {
            console.log("Error login",error);
            res.status(StatusCode.InternalServerError).json({ message: 'Internal server error' });
        }
    }
}