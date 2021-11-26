import bcrypt from "bcrypt";
import express from "express";
import jwt from "jsonwebtoken";
import TattooArtistModel from "../../database/models/tattooArtistModel";

class CodeError extends Error {
  code: number | undefined;
}

export const tattooArtistRegister = async (
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

export const tattooArtistLogin = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { email, password } = req.body;

  try {
    const user = await TattooArtistModel.findOne({ email });

    if (!user) {
      const error = new CodeError("Algo ha fallado");
      error.code = 401;
      return next(error);
    }

    const { userDataTattoArtist } = user;
    const correctPassword = await bcrypt.compare(
      password,
      userDataTattoArtist.password
    );
    if (!correctPassword) {
      const error = new CodeError("Algo ha fallado");
      error.code = 401;
      return next(error);
    }

    const token: string = jwt.sign(
      { idUser: user.id },
      process.env.SECRET_TOKEN
    );
    res.json({ token });
  } catch {
    const error = new CodeError("No autorizado");
    error.code = 401;
    next(error);
  }
};
