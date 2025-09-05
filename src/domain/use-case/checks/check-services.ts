import { LogEntity } from "../../entities/log.entity";
import { LogSeverityLevel } from "../../enum/logSeverityLevel";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>;
}

type SuccessCallback = (() => void) | undefined;
type ErrorCallback = ((error: string) => void) | undefined;

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
      this.logRepository.saveLog(
        new LogEntity(LogSeverityLevel.LOW, `URL ${url} is reachable`)
      );
      this.successCallback && this.successCallback();
      return true;
    } catch (error) {
      this.logRepository.saveLog(
        new LogEntity(LogSeverityLevel.HIGH, `URL ${url} is not reachable`)
      );
      this.errorCallback && this.errorCallback(error as string);
      return false;
    }
  }
}
