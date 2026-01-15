type IStatus = "passed" | "failed" | "timedOut" | "skipped" | "interrupted";

export interface ITestPlan {
  Passed: number;
  Fail: number;
  Flaky: number;
  Skip: number;
  ElapsedTestTime: string;

  Evaluate(status: IStatus, retry: number, maxRetry: number): void;
  AccumulatedTestTime(duration: number): void;
}

class TestPlan implements ITestPlan {
  private passed: number;
  private fail: number;
  private flaky: number;
  private skip: number;
  private elapsedTestTime: number;

  constructor() {
    this.passed = 0;
    this.fail = 0;
    this.flaky = 0;
    this.skip = 0;
    this.elapsedTestTime = 0;
  }

  public get Passed() {
    return this.passed;
  }

  public get Fail() {
    return this.fail;
  }

  public get Flaky() {
    return this.flaky;
  }

  public get Skip() {
    return this.skip;
  }

  public get ElapsedTestTime() {
    const totalSeconds = this.elapsedTestTime / 1000;
    if (totalSeconds < 60) {
      return `${totalSeconds}s`;
    }

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const parts = [];

    if (hours > 0) parts.push(`${hours}h`);
    if (minutes > 0) parts.push(`${minutes}m`);
    if (seconds > 0 || parts.length === 0) parts.push(`${seconds}s`);
    return parts.join(" ");
  }

  Evaluate(status: IStatus, retry: number, maxRetry: number): void {
    switch (status) {
      case "passed": {
        if (retry > 1) {
          this.flaky++;
          break;
        }
        this.passed++;
        break;
      }
      case "failed": {
        if (retry === maxRetry) {
          this.fail++;
        }
        break;
      }
      case "skipped": {
        this.skip++;
        break;
      }
      default: {
        break;
      }
    }
  }

  AccumulatedTestTime(duration: number) {
    this.elapsedTestTime += duration;
  }
}

export default TestPlan;
