import { IUserData } from '../../interface/IUserData';
import { hashPassword } from '../../utlis/haspPassword';
import bcrypt from 'bcryptjs'
import userModel from "../model/userModel";

export default class AuthRepository{
    findByEmail = async(email:string): Promise<IUserData | null> =>{
        try {
            const user = await userModel.findOne({email}).exec()
            console.log("login",user);
            
            return user as IUserData | null
        } catch (error) {
            console.log("Error finding user in repo",error);
            return null
        }
    }


    save = async(data:IUserData): Promise<IUserData | null> =>{
        try {
            let pass
            if(data.password){
                 pass = await hashPassword(data.password)
            }
            const newUser = new userModel({
                ...data,
                password: pass, 
              });
              const savedUser = await newUser.save();
              console.log("data save????????");
              
              return savedUser ? (savedUser as IUserData) : null;
        } catch (error) {
            console.log("Error finding user in repo",error);
            return null
        }
    }

    findUser = async(email:string, password:string): Promise<IUserData | null> =>{
        try {
            const user = await userModel.findOne({email}).exec()
            if(!user){
                return null
            }
            const isPasswordMatch = await bcrypt.compare(password, user.password);
            if (!isPasswordMatch) {
                return null;
            }

            return user as IUserData
        } catch (error) {
            console.log("Error finding user in repo",error);
            return null
        }
    }
}