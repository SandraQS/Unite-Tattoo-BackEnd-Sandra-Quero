const cors = require("cors");
const morgan = require("morgan");
const debug = require("debug")("UniteTattoo:server");
const express = require("express");
const chalk = require("chalk");
const {
  handlerNotFound,
  handlerGeneralError,
} = require("./middlewares/errors");

const app = express();

const initServer = (port) =>
  new Promise<void>((resolve, reject) => {
    const server = app.listen(port, () => {
      debug(chalk.yellow(`Escuchando en el puerto ${port}`));
      resolve(server);
    });

    server.on("error", (error) => {
      debug(chalk.red("Error al iniciar el servidor"));
      if (error.code === "EADDRINUSE") {
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
app.use("/prueba", (req, res) => {
  res.json("hola");
});

app.use(handlerNotFound);
app.use(handlerGeneralError);
export = { initServer, app };
