import express from 'express';
import BookController from '../controller/bookController';

const bookRouter = express.Router() 

const bookController = new BookController()

bookRouter.post('/addBook', bookController.addBook);
bookRouter.get('/getBooks', bookController.fetchData);
bookRouter.delete('/deleteBook', bookController.delete);

export {bookRouter}