import express from "express";
import paths from "../../paths/paths";
import {
  createWork,
  getWorks,
  editWork,
  deleteWork,
} from "../../controllers/worksControllers";

const router = express.Router();

router.post(`${paths.work}${paths.create}/:idCollection`, createWork);
router.get(`${paths.works}`, getWorks);
router.put(`${paths.work}${paths.edit}/:idWork`, editWork);
router.delete(`${paths.work}${paths.delete}/:idWork`, deleteWork);

export default router;
