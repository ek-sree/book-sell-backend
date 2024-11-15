"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const enum_1 = require("../../interface/enum");
const bookRepo_1 = __importDefault(require("../repository/bookRepo"));
const bookRepo = new bookRepo_1.default();
class BookUseCase {
    constructor() {
        this.addBook = async (data) => {
            try {
                const result = await bookRepo.addBook(data);
                if (!result) {
                    return { status: enum_1.StatusCode.InternalServerError, message: "Book not added" };
                }
                return { status: enum_1.StatusCode.Created, message: "Book created", data: result };
            }
            catch (error) {
                console.log("Error add book in use-case", error);
                return { status: enum_1.StatusCode.InternalServerError, message: 'Internal server error' };
            }
        };
        this.fetchBooks = async (searchQuery, page = 1) => {
            try {
                const result = await bookRepo.findBooks(searchQuery, page);
                if (!result) {
                    return { status: enum_1.StatusCode.NotFound, message: "No data found" };
                }
                return { status: enum_1.StatusCode.OK, message: "Data found", data: result };
            }
            catch (error) {
                console.log("Error fetching books in use-case", error);
                return { status: enum_1.StatusCode.InternalServerError, message: 'Internal server error' };
            }
        };
        this.deleteBook = async (bookId) => {
            try {
                const result = await bookRepo.deleteBook(bookId);
                if (!result) {
                    return { status: enum_1.StatusCode.InternalServerError, message: "Cant deleted right now" };
                }
                return { status: enum_1.StatusCode.OK, message: "Book deleted" };
            }
            catch (error) {
                console.log("Error deleting books in use-case", error);
                return { status: enum_1.StatusCode.InternalServerError, message: 'Internal server error' };
            }
        };
    }
}
exports.default = BookUseCase;
