interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>;
}

type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckServices implements CheckServiceUseCase {
  constructor(
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback
  ) {
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
      this.successCallback();
      return true;
    } catch (error) {
      this.errorCallback(error as string);
      return false;
    }
  }
}
