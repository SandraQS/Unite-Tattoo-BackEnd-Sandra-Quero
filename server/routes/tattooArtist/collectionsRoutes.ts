import express from "express";
import paths from "../../paths/paths";
import {
  createCollection,
  getCollections,
  deleteCollection,
  editCollection,
} from "../../controllers/collectionsController";
import upload from "../../middlewares/upload";
import firebase from "../../middlewares/firebase";

const router = express.Router();

router.post(
  `${paths.collection}${paths.create}`,
  upload.single("image"),
  firebase,
  createCollection
);
router.get(`${paths.collections}`, getCollections);
router.delete(
  `${paths.collection}${paths.delete}/:idCollection`,
  deleteCollection
);
router.put(
  `${paths.collection}${paths.edit}/:idCollection`,
  upload.single("image"),
  firebase,
  createCollection,
  editCollection
);

export default router;
