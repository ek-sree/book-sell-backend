import { Types } from "mongoose";

export interface IUserData {
    _id?: Types.ObjectId; 
    name: string;
    email: string;
    password?: string;
}
