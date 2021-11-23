import express from "express";
import collectionModel from "../../database/models/collections";

class CodeError extends Error {
  code: number | undefined;
}

export const getCollections = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const collections = await collectionModel.find();
    res.json({ collections });
  } catch {
    const error = new CodeError("No encontrado");
    error.code = 404;
    next(error);
  }
};

export const createCollection = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { tattooStyles, image } = req.body;
  try {
    const newCollection = await collectionModel.create({
      tattooStyles,
      image,
    });
    res.status(201).json(newCollection);
  } catch {
    const error = new CodeError("Objeto no válido");
    error.code = 404;
    next(error);
  }
};
