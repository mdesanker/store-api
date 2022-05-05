import express from "express";

import categoryRouter from "../api/category";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/category", categoryRouter);

export = app;
