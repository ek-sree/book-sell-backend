import { StatusCode } from "../../interface/enum";
import { IBook } from "../../interface/IBook";
import { IUserData } from "../../interface/IUserData";
import { generateOtp } from "../../utlis/generateOtp";
import { sendOtpEmail } from "../../utlis/sendOtpEmail";
import BookRepository from "../repository/bookRepo";

const bookRepo=new BookRepository()


export default class BookUseCase{
    addBook = async(data:IBook) :Promise<{status:number, message:string, data?:IBook}> =>{
        try {
           const result = await bookRepo.addBook(data);
           if(!result){
            return{status:StatusCode.InternalServerError as number, message:"Book not added"}
           }
           return{status: StatusCode.Created as number, message:"Book created", data:result}
        } catch (error) {
            console.log("Error add book in use-case",error);
            return{status :StatusCode.InternalServerError as number, message:'Internal server error'}
        }
    }

    fetchBooks = async (searchQuery?: string, page: number = 1): Promise<{ status: number; message: string; data?: IBook[] }> => {
        try {
          const result = await bookRepo.findBooks(searchQuery, page);
          if (!result) {
            return { status: StatusCode.NotFound as number, message: "No data found" };
          }
          return { status: StatusCode.OK as number, message: "Data found", data: result };
        } catch (error) {
          console.log("Error fetching books in use-case", error);
          return { status: StatusCode.InternalServerError as number, message: 'Internal server error' };
        }
      };

    deleteBook = async(bookId:string):Promise<{status:number, message:string}>=>{
        try {
            const result = await bookRepo.deleteBook(bookId);
            if(!result){
                return{status: StatusCode.InternalServerError as number, message:"Cant deleted right now"}
            }
            return{status:StatusCode.OK as number, message:"Book deleted"}
        } catch (error) {
            console.log("Error deleting books in use-case",error);
            return{status :StatusCode.InternalServerError as number, message:'Internal server error'}
        }
    }

}