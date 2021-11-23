import dotenv from "dotenv";

dotenv.config();

import initDB from "./database";

import initServer from "./server";

const port = process.env.PORT ?? process.env.SERVER_PORT ?? 3000;

(async () => {
  await initDB(process.env.MONGODB_STRING_UNITETATTOO);
  await initServer(port);
})();
