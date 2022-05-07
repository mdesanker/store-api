import "dotenv/config";
import { Request, Response, NextFunction } from "express";
import User, { IUser } from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const register = async (req: Request, res: Response, next: NextFunction) => {
  const { username, email, password } = req.body;

  // console.log(req.body);

  try {
    // Check email is unique
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(409)
        .json({ errors: [{ msg: "Email already in use" }] });
    }

    // Create new user
    const user = new User<IUser>({
      username,
      email,
      password,
      isAdmin: false,
    });

    user.password = await bcrypt.hash(password, 10);

    // console.log("USER", user);

    await user.save();
    // console.log("user saved");

    // Generate jwt
    const payload = {
      user: {
        id: user.id,
      },
    };

    console.log(payload);

    const token = jwt.sign(payload, process.env.KEY_DEV as string, {
      expiresIn: "6h",
    });

    console.log(token);

    res.status(201).json({ token });
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).send("Server error");
    }
  }
};

export default { register };
