import express from "express";
import paths from "../../paths/paths";
import usersRoutes from "./usersRoutes";
import collectionsRoutes from "./collectionsRoutes";
import worksRoutes from "./worksRoutes";
import auth from "../../middlewares/auth";

const router = express.Router();

router.use(`${paths.tattooArtist}`, usersRoutes);
router.use(`${paths.tattooArtist}`, auth, collectionsRoutes);
router.use(`${paths.tattooArtist}`, auth, worksRoutes);

export default router;
