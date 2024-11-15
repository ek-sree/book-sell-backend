import { Request, Response } from "express";
import { StatusCode } from "../../interface/enum";
import BookUseCase from "../use-case/bookUsecase";

export default class BookController {
    private bookUseCase: BookUseCase;

    constructor() {
        this.bookUseCase = new BookUseCase();
    }

    addBook = async(req: Request, res: Response): Promise<void> =>{
        try {
            console.log(req.body,req.query.userId);
            const {title, author, description} = req.body;
            const userId = req.query.userId as string
            if (typeof userId !== 'string') {
                res.status(StatusCode.NotAcceptable).json({ message: "Invalid userId format" });
                return;
            }

            if(!title || !author || !description || !userId){
                res.status(StatusCode.NotAcceptable).json({message:"Credientials are missing"})
                return 
            }
            const data ={title,author,description, userId}
            const response = await this.bookUseCase.addBook(data)
            console.log(response,"ddddddddddddd");
            res.status(response.status).json({message:response.message, data:response.data})
            
        } catch (error) {
            console.log("Error add books",error);
            res.status(StatusCode.InternalServerError).json({ message: 'Internal server error' });
        }
    }

    fetchData = async (req: Request, res: Response): Promise<void> => {
        try {
          const { searchQuery, page = 1 } = req.query;
          const response = await this.bookUseCase.fetchBooks(searchQuery as string | undefined, Number(page));
          res.status(response.status).json({ message: response.message, data: response.data });
        } catch (error) {
          console.log("Error getting books", error);
          res.status(StatusCode.InternalServerError).json({ message: 'Internal server error' });
        }
      };

    delete = async(req: Request, res:Response): Promise<void>=>{
        try {
            const bookId = req.query.id as string
            if(!bookId){
                res.status(StatusCode.NotAcceptable).json({message:"Credientials are missing"})
                return 
            }
            const response = await this.bookUseCase.deleteBook(bookId);
            res.status(response.status).json({message:response.message})
        } catch (error) {
            console.log("Error deleting books",error);
            res.status(StatusCode.InternalServerError).json({ message: 'Internal server error' });
        }
    }
}