import { Schema, model } from "mongoose";

export interface IUser {
  _id?: string;
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true, minlength: 6, select: false },
  isAdmin: { type: Boolean, required: true, default: false },
});

export default model("User", UserSchema);
