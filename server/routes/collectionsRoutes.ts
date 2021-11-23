import express from "express";
import {
  createCollection,
  getCollections,
} from "../controllers/collectionsController";

const router = express.Router();

router.post("/collection/create", createCollection);
router.get("/collection/", getCollections);

export default router;
