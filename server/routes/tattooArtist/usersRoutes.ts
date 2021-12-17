import express from "express";
import {
  tatooArtistPorfile,
  tattooArtistLogin,
  tattooArtistRegister,
} from "../../controllers/tattooArtistController";
import auth from "../../middlewares/auth";
import paths from "../../paths/paths";

const router = express.Router();

router.post(`${paths.register}`, tattooArtistRegister);
router.post(`${paths.login}`, tattooArtistLogin);
router.get(`${paths.porfile}`, auth, tatooArtistPorfile);

export default router;
