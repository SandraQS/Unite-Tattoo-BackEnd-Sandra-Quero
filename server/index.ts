import cors from "cors";
import morgan from "morgan";
import Debug from "debug";
import express from "express";
import chalk from "chalk";

const debug = Debug("UniteTattoo:database");

import { handlerNotFound, handlerGeneralError } from "./middlewares/errors";
import tattooArtistRoutes from "./routes/tattooArtistRoutes";
import collectionsRoutes from "./routes/collectionsRoutes";

const app = express();

const initServer = (port) =>
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

app.use("/tattooArtist", tattooArtistRoutes);
app.use("/tattooArtist", collectionsRoutes);

app.use(handlerNotFound);
app.use(handlerGeneralError);

export default initServer;
