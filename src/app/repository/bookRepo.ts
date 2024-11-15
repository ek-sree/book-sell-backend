import { IBook } from '../../interface/IBook';
import bookModel from '../model/bookModel';

export default class BookRepository{
    addBook = async(data:IBook): Promise<IBook | null> =>{
        try {
            const book = await bookModel.create(data)    
            return {
                ...book.toObject(),
                userId: book.userId.toString(),
              } as IBook;
        } catch (error) {
            console.log("Error saving book data in repo",error);
            return null
        }
    }

    findBooks = async (searchQuery?: string, page: number = 1): Promise<IBook[] | null> => {
        try {
          const limit = 10; 
          const skip = (page - 1) * limit;
      
          let query: any = {};
          if (searchQuery) {
            query = {
              $or: [
                { title: { $regex: searchQuery, $options: 'i' } },
                { author: { $regex: searchQuery, $options: 'i' } },
                { description: { $regex: searchQuery, $options: 'i' } },
              ],
            };
          }
      
          const books = await bookModel.find(query).skip(skip).limit(limit).exec();
      
          if (!books) {
            return null;
          }
      
          return books as unknown as IBook[];
        } catch (error) {
          console.log("Error fetching books in repo", error);
          return null;
        }
      };

    deleteBook = async(bookId:string):Promise<IBook | null>=>{
        try {
            const book = await bookModel.findOne({_id: bookId})
            if(!book){
                return null
            }
            await bookModel.deleteOne({ _id: bookId });

            return book as unknown as IBook;
        } catch (error) {
            console.log("Error deleting book data in repo",error);
            return null
        }
    }
}