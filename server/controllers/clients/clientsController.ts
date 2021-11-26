import express from "express";
import bcrypt from "bcrypt";
import clientnModel from "../../../database/models/clientModel";

class CodeError extends Error {
  code: number | undefined;
}

export const clientRegister = async (
  req,
  res: express.Response,
  next: express.NextFunction
) => {
  const { personalDataClient, userDataClient, interestDataClient } = req.body;
  const { password } = userDataClient;
  const { fileURL } = req.file;

  try {
    const newClient = await clientnModel.create({
      personalDataClient,
      userDataClient: {
        ...userDataClient,
        password: await bcrypt.hash(password, 10),
      },
      interestDataClient,
      profileImage: fileURL,
    });

    res.status(201).json(newClient);
  } catch {
    const error = new CodeError("Objeto no válido");
    error.code = 404;
    next(error);
  }
};

export default clientRegister;
