import { Router } from "express";
import authController from "../../controllers/auth";
import validation from "../../middleware/validation";

const auth = Router();

auth.post("/register", validation.registerUser, authController.register);
auth.post("/login");

export = auth;
