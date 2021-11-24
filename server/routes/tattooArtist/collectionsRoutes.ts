import express from "express";
import {
  createCollection,
  getCollections,
  deleteCollection,
  editCollection,
} from "../../controllers/collectionsController";

const router = express.Router();

router.post("/collection/create", createCollection);
router.get("/collection", getCollections);
router.delete("/collection/delete/:id", deleteCollection);
router.put("/collection/edit/:idCollection", editCollection);

export default router;
