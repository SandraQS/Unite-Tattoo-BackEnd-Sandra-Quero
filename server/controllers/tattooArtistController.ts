import bcrypt from "bcrypt";
import express from "express";
import TattooArtistModel from "../../database/models/tattooArtistModel";

class CodeError extends Error {
  code: number | undefined;
}

const tattooArtistRegister = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const {
    personalDataTattoArtist,
    userDataTattoArtist,
    professionalDataTattooArtist,
    collections,
    appointmentSchedule,
  } = req.body;
  const { password } = userDataTattoArtist;

  try {
    const newTattooArtist = await TattooArtistModel.create({
      personalDataTattoArtist,
      userDataTattoArtist: {
        ...userDataTattoArtist,
        password: await bcrypt.hash(password, 10),
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
