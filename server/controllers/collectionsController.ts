import express from "express";
import collectionModel from "../../database/models/collectionModel";

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

export const deleteCollection = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { id } = req.params;
  try {
    await collectionModel.findByIdAndDelete(id);
    res.json(`Se ha borrado la colección con la id ${id}`);
  } catch {
    const error = new CodeError("Id no encontrada");
    error.code = 400;
    next(error);
  }
};

export const editCollection = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { idCollection } = req.params;
  if (!idCollection) {
    const error = new CodeError("Id no encontrada");
    error.code = 404;
    return next(error);
  }
  try {
    await collectionModel.findByIdAndUpdate(idCollection, req.body);
    const collectionEdited = await collectionModel.findById(idCollection);
    res.json(collectionEdited);
  } catch {
    const error = new CodeError("No se ha podido modificar la colección");
    error.code = 404;
    next(error);
  }
};
