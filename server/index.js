import dotenv from "dotenv";
dotenv.config();

import express from "express";
const app = express();

import cors from "cors";
import { homeRouter } from "./routes/home.js";

app.use(cors());
app.use(express.json());

app.use("/", homeRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Server running in Port ${PORT}`);
});
