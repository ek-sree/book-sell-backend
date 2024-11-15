"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bookModel_1 = __importDefault(require("../model/bookModel"));
class BookRepository {
    constructor() {
        this.addBook = async (data) => {
            try {
                const book = await bookModel_1.default.create(data);
                return {
                    ...book.toObject(),
                    userId: book.userId.toString(),
                };
            }
            catch (error) {
                console.log("Error saving book data in repo", error);
                return null;
            }
        };
        this.findBooks = async (searchQuery, page = 1) => {
            try {
                const limit = 10;
                const skip = (page - 1) * limit;
                let query = {};
                if (searchQuery) {
                    query = {
                        $or: [
                            { title: { $regex: searchQuery, $options: 'i' } },
                            { author: { $regex: searchQuery, $options: 'i' } },
                            { description: { $regex: searchQuery, $options: 'i' } },
                        ],
                    };
                }
                const books = await bookModel_1.default.find(query).skip(skip).limit(limit).exec();
                if (!books) {
                    return null;
                }
                return books;
            }
            catch (error) {
                console.log("Error fetching books in repo", error);
                return null;
            }
        };
        this.deleteBook = async (bookId) => {
            try {
                const book = await bookModel_1.default.findOne({ _id: bookId });
                if (!book) {
                    return null;
                }
                await bookModel_1.default.deleteOne({ _id: bookId });
                return book;
            }
            catch (error) {
                console.log("Error deleting book data in repo", error);
                return null;
            }
        };
    }
}
exports.default = BookRepository;
