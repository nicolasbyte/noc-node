import { envs } from "./config/plugins/envs.plugins";
import { ServerApp } from "./presentation/server";

(async () => {
  await main();
})();

async function main() {
  console.log(envs.PORT);
  ServerApp.start();
}
