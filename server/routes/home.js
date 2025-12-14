import { habitRouter } from "./habits.js";
import { calanderRouter } from "./calander.js";

import express from "express";
const homeRouter = express.Router();
import { pool } from "../db/pool.js";
import { statsRouter } from "./stats.js";

homeRouter.use("/habits", habitRouter);
homeRouter.use("/calander", calanderRouter);
homeRouter.use("/stats", statsRouter);

export { homeRouter };
