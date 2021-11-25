import express from "express";
import {
  tattooArtistLogin,
  tattooArtistRegister,
} from "../../controllers/tattooArtistController";
import paths from "../../paths/paths";

const router = express.Router();

router.post(`${paths.register}`, tattooArtistRegister);
router.use(`/login`, tattooArtistLogin);

export default router;
