import mongoose, { Document, Schema } from "mongoose";
export interface UserInterface extends Document {
    name: string;
    email: string;
    password: string;
    isStatus:boolean;
  }

const bookSchema = new Schema<UserInterface>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isStatus: { type: Boolean, default: true },
  });
  
  const userModel = mongoose.model<UserInterface>('User', bookSchema);

export default userModel;