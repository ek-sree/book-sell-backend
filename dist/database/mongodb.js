"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../config/config"));
const connectToDatabase = async () => {
    try {
        await mongoose_1.default.connect(config_1.default.DB_URI, {
            ssl: true, // Enable SSL explicitly (this is still necessary for Atlas)
            tlsInsecure: false, // Ensure SSL verification
        });
        console.log('Connected to MongoDB');
    }
    catch (error) {
        console.log("Error connecting to MongoDB:");
        console.log(error);
        if (error instanceof Error) {
            console.log("Error message:", error.message);
            console.log("Error name:", error.name);
        }
    }
};
exports.connectToDatabase = connectToDatabase;
