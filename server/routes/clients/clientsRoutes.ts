import express from "express";
import paths from "../../paths/paths";
import usersClientsRoutes from "./usersClientsRoutes";
import homeClientsRoutes from "./homeClientsRoutes";

const router = express.Router();

router.use(`${paths.client}`, usersClientsRoutes);
router.use(`${paths.client}`, homeClientsRoutes);

export default router;
