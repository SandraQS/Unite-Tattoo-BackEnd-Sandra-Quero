import express from "express";
import WorkModel from "../../database/models/workModel";

class CodeError extends Error {
  code: number | undefined;
}

const createWork = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { tittle, tattooArtist, description, tattooStyles, image } = req.body;
  try {
    const nerWork = await WorkModel.create({
      tittle,
      tattooArtist,
      description,
      tattooStyles,
      image,
    });
    res.status(201).json(nerWork);
  } catch {
    const error = new CodeError("Objeto no válido");
    error.code = 404;
    next(error);
  }
};

export default createWork;
