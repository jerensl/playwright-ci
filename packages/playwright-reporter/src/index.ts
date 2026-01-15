import type {
  FullConfig,
  FullResult,
  Reporter,
  Suite,
  TestCase,
  TestResult,
} from "@playwright/test/reporter";
import LoggerFactory, { Logger } from "./logging";
import Utils, { IUtility } from "./utils";
import TestPlan, { ITestPlan } from "./domain";
interface PlaywrightCIOptions {
  logType?: "singleline" | "multiline";
  failureThreshold: number;
}

class PlaywrightCI implements Reporter {
  readonly logger: Logger;
  readonly utils: IUtility;
  readonly info: ITestPlan;

  constructor(
    private options: PlaywrightCIOptions = {
      logType: "singleline",
      failureThreshold: 1,
    },
  ) {
    if (typeof options.logType === "undefined") {
      options.logType = "singleline";
    }
    this.logger = LoggerFactory.createLogger(options.logType);
    this.utils = new Utils();
    this.info = new TestPlan();
  }

  onBegin(config: FullConfig, suite: Suite) {
    this.logger.info(
      `Starting test run with ${this.utils.countUniqueSuites(suite)} suite(s) and ${this.utils.countUniqueTests(suite)} test(s) with ${config.workers} worker(s).`,
    );
  }

  onTestBegin(test: TestCase, _result: TestResult) {
    this.logger.test(
      this.utils.getProjectName(test.parent),
      `Started: ${test.title}`,
    );
  }

  onTestEnd(test: TestCase, result: TestResult) {
    this.info.Evaluate(result.status, result.retry, test.retries);
    const projectName = this.utils.getProjectName(test.parent);
    if (result.status === "passed") {
      this.logger.successMessage(projectName, test.title, result.duration);
    } else if (result.status === "failed" && result.retry === test.retries) {
      this.logger.errorMessage(
        projectName,
        test.title,
        result.error?.location?.file || "",
        result.error?.location?.line || 0,
        result.duration,
      );
    }
    this.info.AccumulatedTestTime(result.duration);
  }

  onEnd(_result: FullResult) {
    this.logger.info(
      `Finished test run: ✅ ${this.info.Passed} passed | ❌ ${this.info.Fail} failed | ⏭  ${this.info.Skip} skipped | Time: ${this.info.ElapsedTestTime}`,
    );

    if (this.info.Fail >= this.options.failureThreshold) {
      process.exit(1);
    } else {
      process.exit(0);
    }
  }

  onStdErr(chunk: string | Buffer, _test: TestCase, _result: TestResult) {
    const text = chunk.toString("utf-8");
    process.stderr.write(text);
  }

  onStdOut(chunk: string | Buffer, _test: TestCase, _result: TestResult) {
    const text = chunk.toString("utf-8");
    process.stdout.write(text);
  }
}

export default PlaywrightCI;
