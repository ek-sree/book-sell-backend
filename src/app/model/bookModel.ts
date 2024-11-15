import mongoose, { Document, Schema } from "mongoose";
export interface BookInterface extends Document {
    title: string;
    author: string;
    description: string;
    userId: mongoose.Schema.Types.ObjectId;
    isStatus:boolean;
  }

const bookSchema = new Schema<BookInterface>({
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } ,
    isStatus: { type: Boolean, default: true },
  });
  
  const bookModel = mongoose.model<BookInterface>('Book', bookSchema);

export default bookModel;