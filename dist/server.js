"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("./config/config"));
const bookRoute_1 = require("./app/routes/bookRoute");
const authRouter_1 = require("./app/routes/authRouter");
const mongodb_1 = require("./database/mongodb");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: 'https://guileless-bubblegum-0c40b9.netlify.app/',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use('/api', bookRoute_1.bookRouter);
app.use('/api/user/', authRouter_1.authRouter);
const port = config_1.default.port;
const startServer = async () => {
    try {
        await (0, mongodb_1.connectToDatabase)();
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    }
    catch (error) {
        console.log('Error starting server', error);
    }
};
startServer();
