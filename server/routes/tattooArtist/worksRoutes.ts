import express from "express";
import paths from "../../paths/paths";
import { createWork, getWorks } from "../../controllers/worksControllers";

const router = express.Router();

router.get(`${paths.works}`, getWorks);
router.post(`${paths.work}${paths.create}`, createWork);

export default router;
