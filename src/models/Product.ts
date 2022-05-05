import { Schema, Types, model } from "mongoose";

export interface IProduct {
  _id?: string;
  name: string;
  price: number;
  description?: string;
  category: Types.ObjectId;
  images: string[];
}

const ProductSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  images: [{ type: String }],
});

export default model("Product", ProductSchema);
