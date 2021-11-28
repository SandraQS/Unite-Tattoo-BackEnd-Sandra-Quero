import express from "express";
import collectionModel from "../../database/models/collectionModel";
import TattooArtistModel from "../../database/models/tattooArtistModel";

class CodeError extends Error {
  code: number | undefined;
}

export const getCollections = async (
  req,
  res: express.Response,
  next: express.NextFunction
) => {
  const { idUser } = req;

  try {
    const tattooArtistUser = await TattooArtistModel.findById(idUser).populate({
      path: "collections",
      populate: { path: "works" },
    });

    res.json({ tattooArtistUser });
  } catch {
    const error = new CodeError("No encontrado");
    error.code = 404;
    next(error);
  }
};

export const createCollection = async (
  req,
  res: express.Response,
  next: express.NextFunction
) => {
  const { tattooStyles } = req.body;
  const { file } = req;
  let image;

  if (file) {
    image = file.fileURL;
  }

  const { idUser } = req;

  const tattooArtistuser = await TattooArtistModel.findById(idUser);

  try {
    const newCollection = await collectionModel.create({
      tattooStyles,
      image,
    });

    tattooArtistuser.collections.push(newCollection.id);
    tattooArtistuser.save();

    res.status(201).json(newCollection);
  } catch {
    const error = new CodeError("Objeto no válido");
    error.code = 404;
    next(error);
  }
};

export const deleteCollection = async (
  req,
  res: express.Response,
  next: express.NextFunction
) => {
  const { idCollection } = req.params;
  const { idUser } = req;
  try {
    const tattooArtist = await TattooArtistModel.findById(idUser);
    if (!idCollection) {
      const error = new CodeError("Id no encontrada");
      error.code = 400;
      return next(error);
    }
    await collectionModel.findByIdAndDelete(idCollection);
    tattooArtist.collections = tattooArtist.collections.filter(
      (collectionDeleted) => idCollection !== collectionDeleted.toString()
    );
    tattooArtist.save();

    res.json(`Se ha borrado la colección con la id ${idCollection}`);
  } catch {
    const error = new CodeError("Id no encontrada");
    error.code = 400;
    next(error);
  }
};

export const editCollection = async (
  req,
  res: express.Response,
  next: express.NextFunction
) => {
  const { idCollection } = req.params;
  const collectionEdit = req.body;
  const { fileURL } = req.file;
  if (!idCollection) {
    const error = new CodeError("Id no encontrada");
    error.code = 404;
    return next(error);
  }
  try {
    await collectionModel.findByIdAndUpdate(idCollection, {
      ...collectionEdit,
      image: fileURL,
    });
    const collectionEdited = await collectionModel.findById(idCollection);
    res.status(202).json(collectionEdited);
  } catch {
    const error = new CodeError("No se ha podido modificar la colección");
    error.code = 404;
    next(error);
  }
};
