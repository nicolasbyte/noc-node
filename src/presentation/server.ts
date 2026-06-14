import { LogSeverityLevel } from "../domain/enum/logSeverityLevel";
import { CheckServices } from "../domain/use-case/checks/check-services";
import { CheckServicesMultiple } from "../domain/use-case/checks/check-services-multiple";
import { SendEmailLogs } from "../domain/use-case/emails/send-email-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { MongoLogDataSource } from "../infrastructure/datasources/mongo-log.datasource";
import { PostgresLogDataSource } from "../infrastructure/datasources/postgres-log.datasource";
import { LogRepositoryImpl } from "../infrastructure/repository/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email-service";

const logRepositoryPostgres = new LogRepositoryImpl(
  new PostgresLogDataSource()
);
const logRepositoryMongoDB = new LogRepositoryImpl(
  new MongoLogDataSource()
);
const logRepositoryFileSystem = new LogRepositoryImpl(
  new FileSystemDatasource()
);
const emailService = new EmailService();
export class ServerApp {
  public static async start() {
    console.log("Server is running on port 3000");


    //Mandar email
    // new SendEmailLogs(
    //   emailService,
    //   fileSystemLogRepository
    // ).execute(["nvergararojas53@gmail.com"])


    // const logs = await logRepositoryPostgres.getLogs(LogSeverityLevel.HIGH);
    // console.log(logs);

    CronService.createJob("*/5 * * * * *", () => {
      const checkServices = new CheckServicesMultiple(
        [logRepositoryFileSystem, logRepositoryMongoDB, logRepositoryPostgres],
        undefined,
        undefined
      );
      checkServices.execute("http://localhost:3005");
    });
  }
}
