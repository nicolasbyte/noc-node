import { envs } from './config/plugins/envs.plugins';
import { MongoDataBase } from "./data/mongo";
import { ServerApp } from "./presentation/server";

(async () => {
  await main();
})();

async function main() {
  await MongoDataBase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME,
  });




  ServerApp.start();
}
