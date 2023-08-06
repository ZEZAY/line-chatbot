export interface IController {
  controllerName: string;
  getClassName(): string;
  getJobName(): string[];

  handleJob(name: string, data?: unknown): Promise<void>;
}
