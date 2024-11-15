import { Types } from "mongoose";
import { StatusCode } from "../../interface/enum";
import { IUserData } from "../../interface/IUserData";
import { generateOtp } from "../../utlis/generateOtp";
import { createToken } from "../../utlis/jwt";
import { sendOtpEmail } from "../../utlis/sendOtpEmail";
import AuthRepository from "../repository/authRepo";

const authRepo=new AuthRepository()


export default class AuthUseCase{
    register = async(data:IUserData) :Promise<{status:number, message:string, data?:{otp:number}}> =>{
        try {
            const emailExist = await authRepo.findByEmail(data.email);
            console.log("email exist",emailExist);
            
            if(emailExist){
                return {status :StatusCode.Conflict as number, message:"Email already exist"}
            }
            const otp = await generateOtp()
            
            const sendMail = await sendOtpEmail(data.email, otp)
            if(sendMail){
                return {status: StatusCode.OK as number, message:"Otp send successfully",data:{otp}}
            } else {
                return { status: StatusCode.InternalServerError as number, message: "Failed to send OTP email" };
            }
        } catch (error) {
            console.log("Error registring in use-case",error);
            return{status :StatusCode.InternalServerError as number, message:'Internal server error'}
        }
    }


    verifyOtp = async(enteredOtp:number,otpFromCookie:number,data:IUserData): Promise<{status:number, message: string, data?: { user: IUserData, token: string } }>=>{
        try {            
            if(enteredOtp != otpFromCookie){
                return {status: StatusCode.Unauthorized as number, message:"Otp not match"}
            }
            console.log("sssss");
            
            const result = await authRepo.save(data);
            if(!result){
                return{status: StatusCode.InternalServerError as number, message:"Cant save user data"}
            }
            console.log("-....>>");
            
            const token = await createToken(result._id as Types.ObjectId)
            console.log(token);
            
            return{status: StatusCode.Created as number , message:"Data saved !", data: { user: result, token } }
        } catch (error) {
            console.log("Error registring in use-case",error);
            return{status :StatusCode.InternalServerError as number, message:'Internal server error'}
        }
    }


    resendOtp =async(email:string):Promise<{status:number, message:string, data?:{otp:number}}>=>{
        try {
            const otp = await generateOtp()
            
            const sendMail = await sendOtpEmail(email, otp)
            if(sendMail){
                return {status: StatusCode.OK as number, message:"Otp send successfully",data:{otp}}
            } else {
                return { status: StatusCode.InternalServerError as number, message: "Failed to send OTP email" };
            }
        } catch (error) {
            console.log("Error resend otp in use-case",error);
            return{status :StatusCode.InternalServerError as number, message:'Internal server error'}
        }
    }

    login = async(email:string, password:string): Promise<{status:number, message:string, data?:{user: IUserData, token:string}}> =>{
        try {
            const result = await authRepo.findUser(email, password);
            if(!result){
                return{status:StatusCode.NotFound as number, message:"Entered credientials are wrong !"}
            }
            const token = await createToken(result._id as Types.ObjectId)
            return{status:StatusCode.OK as number, message:"Login success", data:{user:result, token}}
        } catch (error) {
            console.log("Error login in use-case",error);
            return{status :StatusCode.InternalServerError as number, message:'Internal server error'}
        }
    }
}