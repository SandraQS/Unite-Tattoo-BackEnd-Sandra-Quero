import express from "express";
import { clientRegister } from "../../controllers/clients/clientsController";
import firebase from "../../middlewares/firebase";
import upload from "../../middlewares/upload";
import paths from "../../paths/paths";

const router = express.Router();

router.post(
  `${paths.register}`,
  upload.single("profileImage"),
  firebase,
  clientRegister
);

export default router;
