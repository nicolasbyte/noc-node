import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity } from "../../domain/entities/log.entity";
import { LogSeverityLevel } from "../../domain/enum/logSeverityLevel";
import fs from "fs";

export class FileSystemDatasource implements LogDatasource {
  private readonly logPath = "logs/";
  private readonly allLogsPath: string = `${this.logPath}all-logs.log`;
  private readonly lowLogsPath: string = `${this.logPath}low-logs.log`;
  private readonly mediumLogsPath: string = `${this.logPath}medium-logs.log`;
  private readonly highLogsPath: string = `${this.logPath}high-logs.log`;

  constructor() {
    this.createLogsFiles();
  }

  private async createLogsFiles() {
    if (!fs.existsSync(this.logPath)) {
      fs.mkdirSync(this.logPath, { recursive: true });
    }

    [
      this.allLogsPath,
      this.lowLogsPath,
      this.mediumLogsPath,
      this.highLogsPath,
    ].forEach((path) => {
      if (!fs.existsSync(path)) {
        fs.writeFileSync(path, "", "utf-8");
      }
    });
  }

  async saveLog(newLog: LogEntity): Promise<void> {
    fs.appendFileSync(this.allLogsPath, newLog.toString() + "\n");
    fs.appendFileSync(this.getFilePath(newLog.level), newLog.toString() + "\n");
  }

  async getStringifiedLogs(severityLevel: LogSeverityLevel): Promise<string> {
    const logsStringified = fs.readFileSync(
      this.getFilePath(severityLevel),
      "utf-8"
    );
    return logsStringified;
  }

  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    const logsStringified = await this.getStringifiedLogs(severityLevel);
    return logsStringified.split("\n").map((log) => LogEntity.fromJson(log));
  }

  private getFilePath(severityLevel: LogSeverityLevel): string {
    return this.logPath + severityLevel + "-logs.log";
  }
}
