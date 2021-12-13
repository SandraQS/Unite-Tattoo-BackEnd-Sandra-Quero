import cors from "cors";
import morgan from "morgan";
import Debug from "debug";
import express from "express";
import chalk from "chalk";

const debug = Debug("UniteTattoo:database");

import { handlerNotFound, handlerGeneralError } from "./middlewares/errors";
import tattooArtistRoutes from "./routes/tattooArtist/tattooArtistRoutes";
import clientsRoutes from "./routes/clients/clientsRoutes";
import paths from "./paths/paths";

export const app = express();
app.disable("x-powered-by");

export const initServer = (port) =>
  new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      debug(chalk.yellow(`Escuchando en el puerto ${port}`));
      resolve(server);
    });

    server.on("error", (error) => {
      debug(chalk.red("Error al iniciar el servidor"));
      if (error.message === "EADDRINUSE") {
        debug(chalk.red(`El puerto ${port} está ocupado`));
      }
      reject();
    });

    server.on("close", () => {
      debug(chalk.blue(`El servidor se ha desconectado`));
    });
  });

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use(`${paths.uniteTattoo}`, tattooArtistRoutes);
app.use(`${paths.uniteTattoo}`, clientsRoutes);

app.use(handlerNotFound);
app.use(handlerGeneralError);
