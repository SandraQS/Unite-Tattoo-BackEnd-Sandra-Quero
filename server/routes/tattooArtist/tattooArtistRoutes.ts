import express from "express";
import usersRoutes from "./usersRoutes";
import collectionsRoutes from "./collectionsRoutes";

const router = express.Router();

router.use("/tattooArtist", usersRoutes);
router.use("/tattooArtist", collectionsRoutes);

export default router;
