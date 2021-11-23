import Debug from "debug";
import chalk from "chalk";
import mongoose from "mongoose";

const debug = Debug("UniteTattoo:database");

const initDB = (connectionDBString) =>
  new Promise<void>((resolve, reject) => {
    mongoose.set("toJSON", {
      virtuals: true,
      transform: (doc, ret) => {
        // eslint-disable-next-line no-underscore-dangle
        delete ret._id;
        // eslint-disable-next-line no-underscore-dangle
        delete ret.__v;
      },
    });

    mongoose.connect(connectionDBString, (error) => {
      if (error) {
        debug(chalk.red("No se ha podido conectar con la base de datos"));
        debug(chalk.red(error.message));
        reject();
        return;
      }
      debug(chalk.green("Conectado a la base de datos"));
      resolve();
    });

    mongoose.connection.on("close", () => {
      debug(chalk.green("Desconectado de la base de datos"));
    });
  });

export default initDB;
