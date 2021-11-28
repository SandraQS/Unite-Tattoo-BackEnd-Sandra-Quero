import express from "express";
import paths from "../../paths/paths";

import auth from "../../middlewares/auth";

import {
  createWork,
  getWorksCollections,
  editWork,
  deleteWork,
} from "../../controllers/worksControllers";
import upload from "../../middlewares/upload";
import firebase from "../../middlewares/firebase";

const router = express.Router();

router.get(`${paths.works}/:idCollection`, auth, getWorksCollections);
router.delete(`${paths.work}${paths.delete}/:idWork`, auth, deleteWork);
router.post(
  `${paths.work}${paths.create}/:idCollection`,
  upload.single("image"),
  firebase,
  auth,
  createWork
);
router.put(
  `${paths.work}${paths.edit}/:idWork`,
  upload.single("image"),
  firebase,
  auth,
  editWork
);

export default router;
