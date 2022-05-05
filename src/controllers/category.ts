import { Request, Response, NextFunction } from "express";
import Category, { ICategory } from "../models/Category";

const getAllCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.json({ msg: "Retrieving all categories" });
};

export default { getAllCategories };
