export class OverlapScheduleError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "OverlapScheduleError";
  }
}
