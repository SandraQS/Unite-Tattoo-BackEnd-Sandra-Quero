import express from "express";
import paths from "../../paths/paths";
import {
  createCollection,
  getCollections,
  deleteCollection,
  editCollection,
} from "../../controllers/collectionsController";

const router = express.Router();

router.post(`${paths.collection}${paths.create}`, createCollection);
router.get(`${paths.collections}`, getCollections);
router.delete(`${paths.collection}${paths.delete}/:id`, deleteCollection);
router.put(`${paths.collection}${paths.edit}/:idCollection`, editCollection);

export default router;
