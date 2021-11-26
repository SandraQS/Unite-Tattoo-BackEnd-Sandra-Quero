import express from "express";
import paths from "../../paths/paths";
import usersClientsRoutes from "./usersClientsRoutes";

// import auth from "../../middlewares/auth";

const router = express.Router();

router.use(`${paths.client}`, usersClientsRoutes);

export default router;
