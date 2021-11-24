import express from "express";
import tattooArtistRegister from "../../controllers/tattooArtistController";

const router = express.Router();

router.post("/register", tattooArtistRegister);

export default router;
