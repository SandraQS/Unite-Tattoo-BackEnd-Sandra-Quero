import express from "express";

const jwt = require("jsonwebtoken");

class CodeError extends Error {
  code: number | undefined;
}

const auth = (req, res: express.Response, next: express.NextFunction) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    const error = new CodeError("No estás autorizado");
    error.code = 401;
    return next(error);
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    const error = new CodeError("No estás autorizado");
    error.code = 401;
    return next(error);
  }
  try {
    const user = jwt.verify(token, process.env.SECRET_TOKEN);
    req.idUser = user.idUser;
    next();
  } catch {
    const error = new CodeError("Token no válido");
    error.code = 401;
    next(error);
  }
};

export default auth;
