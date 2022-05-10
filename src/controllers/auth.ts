import "dotenv/config";
import { Request, Response, NextFunction } from "express";
import User, { IUser } from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const register = async (req: Request, res: Response, next: NextFunction) => {
  const { username, email, password } = req.body;

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

    await user.save();

    // Generate jwt
    const payload = {
      user: {
        id: user.id,
      },
    };

    const token = jwt.sign(payload, process.env.KEY as string, {
      expiresIn: "6h",
    });

    res.status(201).json({ token });
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).send("Server error");
    }
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  try {
    // Check email is valid
    const user = await User.findOne({ email }).select("password");

    if (!user) {
      return res.status(401).json({ errors: [{ msg: "Invalid credentials" }] });
    }

    // Check password matches
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ errors: [{ msg: "Invalid credentials" }] });
    }

    // Generate jwt
    const payload = {
      user: {
        id: user.id,
      },
    };

    const token = jwt.sign(payload, process.env.KEY as string, {
      expiresIn: "6h",
    });

    res.status(200).json({ token });
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).send("Server error");
    }
  }
};

export default { register, login };
