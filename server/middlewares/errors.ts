import chalk from "chalk";
import debug from "debug";

export const handlerNotFound = (req, res) => {
  res.status(404).json({ error: "No se ha encontrado la ruta" });
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const handlerGeneralError = (error, req, res, next) => {
  debug(chalk.red("Ha ocurrido un error: ", error.message));
  const message = error.code ? error.message : "ERROR";
  res.status(error.code || 500).json({ error: message });
};
