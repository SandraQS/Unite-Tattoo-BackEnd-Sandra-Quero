import express from "express";
import {
  tattooArtistLogin,
  tattooArtistRegister,
} from "../../controllers/tattooArtistController";
import paths from "../../paths/paths";

const router = express.Router();

router.post(`${paths.register}`, tattooArtistRegister);
router.post(`${paths.login}`, tattooArtistLogin);

export default router;
