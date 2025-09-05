import { CheckServices } from "../domain/use-case/checks/check-services";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repository/log.repository.impl";
import { CronService } from "./cron/cron-service";

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource()
);

export class ServerApp {
  public static start() {
    console.log("Server is running on port 3000");

    CronService.createJob("*/5 * * * * *", () => {
      const checkServices = new CheckServices(
        fileSystemLogRepository,
        undefined,
        undefined
      );
      checkServices.execute("http://localhost:3005");
    });
  }
}
