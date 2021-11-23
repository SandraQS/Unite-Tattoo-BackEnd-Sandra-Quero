import dotenv from "dotenv";

import initDB from "./database";

import initServer from "./server";

dotenv.config();

const port = process.env.PORT ?? process.env.SERVER_PORT ?? 3000;

(async () => {
  await initDB(process.env.MONGODB_STRING_UNITETATTOO);
  await initServer(port);
})();
