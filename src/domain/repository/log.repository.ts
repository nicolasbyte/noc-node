import { LogEntity } from "../entities/log.entity";
import { LogSeverityLevel } from "../enum/logSeverityLevel";

export abstract class LogRepository {
  abstract saveLog(log: LogEntity): Promise<void>;
  abstract getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]>;
}
