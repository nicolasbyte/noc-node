import { LogSeverityLevel } from "../enum/logSeverityLevel";

export class LogEntity {
  public level: LogSeverityLevel;
  public message: string;
  public createdAt: Date;

  constructor(level: LogSeverityLevel, message: string) {
    this.level = level;
    this.message = message;
    this.createdAt = new Date();
  }

  toString(): string {
    return JSON.stringify(this, null, 2);
  }

  static fromJson(json: string): LogEntity {
    const { level, message, createdAt } = JSON.parse(json);
    const createdAtDate = new Date(createdAt);
    const log = new LogEntity(level, message);
    log.createdAt = createdAtDate;
    return log;
  }
}
