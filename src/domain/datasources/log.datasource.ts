import { LogEntity } from "../entities/log.entity";
import { LogSeverityLevel } from "../enum/logSeverityLevel";

export abstract class LogDatasource {
  abstract saveLog(log: LogEntity): Promise<void>;
  abstract getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]>;
}
