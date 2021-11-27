import express from "express";
import paths from "../../paths/paths";
import { getAllWorks } from "../../controllers/worksControllers";

const router = express.Router();

router.get(`${paths.home}`, getAllWorks);

export default router;
