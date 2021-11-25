import express from "express";
import collectionModel from "../../database/models/collectionModel";
import workModel from "../../database/models/workModel";

class CodeError extends Error {
  code: number | undefined;
}

export const getWorks = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const works = await workModel.find();
    res.json({ works });
  } catch {
    const error = new CodeError("No encontrado");
    error.code = 404;
    next(error);
  }
};

export const createWork = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { tittle, tattooArtist, description, tattooStyles, image } = req.body;
  const { idCollection } = req.params;

  try {
    const collection = await collectionModel.findById(idCollection);
    const newWork = await workModel.create({
      tittle,
      tattooArtist,
      description,
      tattooStyles,
      image,
      collectionWork: idCollection,
    });

    collection.works.push(newWork.id);
    collection.save();

    res.status(201).json(newWork);
  } catch {
    const error = new CodeError("Objeto no válido");
    error.code = 404;
    next(error);
  }
};

export const deleteWork = async (req, res, next) => {
  const { idWork } = req.params;

  try {
    const thisWork = await workModel.findById(idWork);
    const collection = await collectionModel.findById({
      _id: thisWork.collectionWork,
    });

    await workModel.findByIdAndDelete(idWork);
    collection.works.pop();
    collection.save();

    res.json(`Se ha borrado el trabajo con la id ${idWork}`);
  } catch {
    const error = new CodeError("Id no encontrada");
    error.code = 400;
    next(error);
  }
};

export const editWork = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { idWork } = req.params;
  if (!idWork) {
    const error = new CodeError("Id no encontrada");
    error.code = 404;
    return next(error);
  }
  try {
    await workModel.findByIdAndUpdate(idWork, req.body);
    const workEdited = await workModel.findById(idWork);
    res.status(202).json(workEdited);
  } catch {
    const error = new CodeError("No se ha podido modificar el trabajo");
    error.code = 404;
    next(error);
  }
};
