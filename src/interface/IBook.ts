import { Types } from "mongoose";

export interface IBook{
    _id?: Types.ObjectId | string;
    title:string;
    author:string;
    description:string;
    userId: Types.ObjectId | string; 
}