import express from "express";
import paths from "../../paths/paths";
import { createWork, getWork } from "../../controllers/worksControllers";

const router = express.Router();

router.get(`${paths.works}`, getWork);
router.post(`${paths.work}${paths.create}`, createWork);

export default router;
