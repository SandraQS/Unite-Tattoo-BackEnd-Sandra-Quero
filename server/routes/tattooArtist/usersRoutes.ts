import express from "express";
import paths from "../../paths/paths";
import tattooArtistRegister from "../../controllers/tattooArtistController";

const router = express.Router();

router.post(`${paths.register}`, tattooArtistRegister);

export default router;
