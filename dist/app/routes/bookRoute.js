"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRouter = void 0;
const express_1 = __importDefault(require("express"));
const bookController_1 = __importDefault(require("../controller/bookController"));
const bookRouter = express_1.default.Router();
exports.bookRouter = bookRouter;
const bookController = new bookController_1.default();
bookRouter.post('/addBook', bookController.addBook);
bookRouter.get('/getBooks', bookController.fetchData);
bookRouter.delete('/deleteBook', bookController.delete);
