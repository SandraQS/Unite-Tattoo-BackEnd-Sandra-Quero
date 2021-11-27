import express from "express";
import paths from "../../paths/paths";
import {
  createWork,
  getWorksCollections,
  editWork,
  deleteWork,
} from "../../controllers/worksControllers";
import upload from "../../middlewares/upload";
import firebase from "../../middlewares/firebase";

const router = express.Router();

router.get(`${paths.works}/:idCollection`, getWorksCollections);
router.delete(`${paths.work}${paths.delete}/:idWork`, deleteWork);
router.post(
  `${paths.work}${paths.create}/:idCollection`,
  upload.single("image"),
  firebase,
  createWork
);
router.put(
  `${paths.work}${paths.edit}/:idWork`,
  upload.single("image"),
  firebase,
  editWork
);

export default router;
