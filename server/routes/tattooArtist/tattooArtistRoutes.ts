import express from "express";
import paths from "../../paths/paths";
import usersRoutes from "./usersRoutes";
import collectionsRoutes from "./collectionsRoutes";
import worksRoutes from "./worksRoutes";

const router = express.Router();

router.use(`${paths.tattooArtist}`, usersRoutes);
router.use(`${paths.tattooArtist}`, collectionsRoutes);
router.use(`${paths.tattooArtist}`, worksRoutes);

export default router;
