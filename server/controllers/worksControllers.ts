import express from "express";
import collectionModel from "../../database/models/collectionModel";
import workModel from "../../database/models/workModel";

class CodeError extends Error {
  code: number | undefined;
}

export const getWorksCollections = async (
  req,
  res: express.Response,
  next: express.NextFunction
) => {
  const { idCollection } = req.params;

  const collection = await collectionModel.findById(idCollection).populate({
    path: "works",
  });
  try {
    res.json(collection.works);
  } catch {
    const error = new CodeError("No encontrado");
    error.code = 404;
    next(error);
  }
};

export const getAllWorks = async (
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
  req,
  res: express.Response,
  next: express.NextFunction
) => {
  const { tittle, tattooArtist, description, tattooStyles } = req.body;
  const { idCollection } = req.params;
  const { file } = req;
  let image;

  if (file) {
    image = file.fileURL;
  }

  try {
    const collection = await collectionModel.findById(idCollection);
    if (!collection) {
      const error = new CodeError("Colección no encontrada");
      error.code = 404;
      return next(error);
    }
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

    collection.works = collection.works.filter(
      (workDeleted) => idWork !== workDeleted.toString()
    );
    collection.save();

    res.json(`Se ha borrado el trabajo con la id ${idWork}`);
  } catch {
    const error = new CodeError("Id no encontrada");
    error.code = 400;
    next(error);
  }
};

export const editWork = async (
  req,
  res: express.Response,
  next: express.NextFunction
) => {
  const { idWork } = req.params;
  const workEdit = req.body;
  const { file } = req;
  let image;

  if (file) {
    image = file.fileURL;
  }

  try {
    const workEdited = await workModel.findById(idWork);

    if (!workEdited) {
      const error = new CodeError("Trabajo no encontrado");
      error.code = 404;
      return next(error);
    }

    await workModel.findByIdAndUpdate(idWork, {
      ...workEdit,
      image,
    });

    res.status(202).json(workEdited);
  } catch {
    const error = new CodeError("No se ha podido modificar el trabajo");
    error.code = 404;
    next(error);
  }
};
