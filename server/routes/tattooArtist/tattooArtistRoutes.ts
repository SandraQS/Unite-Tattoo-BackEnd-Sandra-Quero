import express from "express";
import paths from "../../paths/paths";
import usersRoutes from "./usersRoutes";
import collectionsRoutes from "./collectionsRoutes";

const router = express.Router();

router.use(`${paths.tattooArtist}`, usersRoutes);
router.use(`${paths.tattooArtist}`, collectionsRoutes);

export default router;
