import express from "express";
import { queryBugs, saveBug } from "./bug.controller.js";

const router = express.Router();

router.get("/", queryBugs);
router.post("/", saveBug);


export const bugsRouter = router;