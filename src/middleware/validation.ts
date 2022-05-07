import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";

const registerUser = [
  // Validate and sanitize input
  check("username", "Username is required").trim().notEmpty(),
  check("email", "Email is required").trim().notEmpty().isEmail(),
  check("password", "Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),

  // Error handling
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    next();
  },
];

export default {
  registerUser,
};
