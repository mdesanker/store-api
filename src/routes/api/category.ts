import { Router } from "express";
import categoryController from "../../controllers/category";

const category = Router();

category.get("/all", categoryController.getAllCategories);
category.get("/:id", categoryController.getSpecificCategory);

export = category;
