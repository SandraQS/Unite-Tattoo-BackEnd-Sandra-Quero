import express from "express";
import createWork from "../../controllers/worksControllers";

const router = express.Router();

router.post("/work/create", createWork);

export default router;
