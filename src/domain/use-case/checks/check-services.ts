import { LogEntity, LogEntityOptions } from "../../entities/log.entity";
import { LogSeverityLevel } from "../../enum/logSeverityLevel";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>;
}

type SuccessCallback = (() => void) | undefined;
type ErrorCallback = ((error: string) => void) | undefined;
const origin: string = 'check-service.ts'

export class CheckServices implements CheckServiceUseCase {
  constructor(
    private readonly logRepository: LogRepository,
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback
  ) {
    this.logRepository = logRepository;
    this.successCallback = successCallback;
    this.errorCallback = errorCallback;
  }

  public async execute(url: string): Promise<boolean> {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(
          `Failed to fetch the URL ${url} with status ${response.status}`
        );
      }
      const log: LogEntityOptions = {
        level: LogSeverityLevel.LOW,
        message: `URL ${url} is reachable`,
        origin
      }
      this.logRepository.saveLog(
        new LogEntity(log)
      );
      this.successCallback && this.successCallback();
      return true;
    } catch (error) {

      const log: LogEntityOptions = {
        level: LogSeverityLevel.HIGH,
        message: `URL ${url} is not reachable`,
        origin
      }

      this.logRepository.saveLog(
        new LogEntity(log)
      );
      this.errorCallback && this.errorCallback(error as string);
      return false;
    }
  }
}
