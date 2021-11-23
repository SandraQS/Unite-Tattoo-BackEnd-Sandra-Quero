import bcrypt from "bcrypt";
import express from "express";
import TattooArtistModel from "../../database/models/tattooArtist";

class CodeError extends Error {
  code: number | undefined;
}

const tattooArtistRegister = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const {
      personalDataTattoArtist,
      userDataTattoArtist: { password, userName, email },
      professionalDataTattooArtist,
      collections,
      appointmentSchedule,
    } = req.body;

    const newTattooArtist = await TattooArtistModel.create({
      personalDataTattoArtist,
      userDataTattoArtist: {
        userName,
        password: await bcrypt.hash(password, 10),
        email,
      },
      professionalDataTattooArtist,
      collections,
      appointmentSchedule,
    });
    res.status(201).json(newTattooArtist);
  } catch {
    const error = new CodeError("Objeto no válido");
    error.code = 404;
    next(error);
  }
};

export default tattooArtistRegister;
