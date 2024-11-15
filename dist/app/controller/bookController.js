"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const enum_1 = require("../../interface/enum");
const bookUsecase_1 = __importDefault(require("../use-case/bookUsecase"));
class BookController {
    constructor() {
        this.addBook = async (req, res) => {
            try {
                console.log(req.body, req.query.userId);
                const { title, author, description } = req.body;
                const userId = req.query.userId;
                if (typeof userId !== 'string') {
                    res.status(enum_1.StatusCode.NotAcceptable).json({ message: "Invalid userId format" });
                    return;
                }
                if (!title || !author || !description || !userId) {
                    res.status(enum_1.StatusCode.NotAcceptable).json({ message: "Credientials are missing" });
                    return;
                }
                const data = { title, author, description, userId };
                const response = await this.bookUseCase.addBook(data);
                console.log(response, "ddddddddddddd");
                res.status(response.status).json({ message: response.message, data: response.data });
            }
            catch (error) {
                console.log("Error add books", error);
                res.status(enum_1.StatusCode.InternalServerError).json({ message: 'Internal server error' });
            }
        };
        this.fetchData = async (req, res) => {
            try {
                const { searchQuery, page = 1 } = req.query;
                const response = await this.bookUseCase.fetchBooks(searchQuery, Number(page));
                res.status(response.status).json({ message: response.message, data: response.data });
            }
            catch (error) {
                console.log("Error getting books", error);
                res.status(enum_1.StatusCode.InternalServerError).json({ message: 'Internal server error' });
            }
        };
        this.delete = async (req, res) => {
            try {
                const bookId = req.query.id;
                if (!bookId) {
                    res.status(enum_1.StatusCode.NotAcceptable).json({ message: "Credientials are missing" });
                    return;
                }
                const response = await this.bookUseCase.deleteBook(bookId);
                res.status(response.status).json({ message: response.message });
            }
            catch (error) {
                console.log("Error deleting books", error);
                res.status(enum_1.StatusCode.InternalServerError).json({ message: 'Internal server error' });
            }
        };
        this.bookUseCase = new bookUsecase_1.default();
    }
}
exports.default = BookController;
