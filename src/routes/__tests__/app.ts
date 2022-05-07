import express from "express";

import authRouter from "../api/auth";
import categoryRouter from "../api/category";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/category", categoryRouter);
app.use("/auth", authRouter);

export = app;
