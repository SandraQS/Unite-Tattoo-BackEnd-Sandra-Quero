require("dotenv").config();
const { initDB } = require("./database/index");
const { initServer } = require("./server/index");

const port = process.env.PORT ?? process.env.SERVER_PORT ?? 3000;

(async () => {
  await initDB(process.env.MONGODB_STRING_UNITETATTOO);
  await initServer(port);
})();
