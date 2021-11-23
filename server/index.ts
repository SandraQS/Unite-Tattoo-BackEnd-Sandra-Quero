import cors from "cors";
import morgan from "morgan";
import Debug from "debug";
import express from "express";
import chalk from "chalk";

import { handlerNotFound, handlerGeneralError } from "./middlewares/errors";
import TattooArtistModel from "../database/models/tattooArtist";

const debug = Debug("UniteTattoo:database");

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

app.post("/prueba", async (req, res) => {
  const {
    personalDataTattoArtist,
    userDataTattoArtist,
    professionalDataTattooArtist,
    collections,
    appointmentSchedule,
  } = req.body;

  const newTattooArtist = await TattooArtistModel.create({
    personalDataTattoArtist,
    userDataTattoArtist,
    professionalDataTattooArtist,
    collections,
    appointmentSchedule,
  });
  res.json(newTattooArtist);
});

app.use(handlerNotFound);
app.use(handlerGeneralError);

export default initServer;
