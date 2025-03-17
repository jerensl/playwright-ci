import type {
    FullConfig, FullResult, Reporter, Suite, TestCase, TestResult
} from '@playwright/test/reporter';
import LoggerFactory, { Logger } from "./logging"
import Utils, { IUtility } from "./utils"
import TestPlan, { ITestPlan } from "./domain"
interface PlaywrightCIOptions {
    logType?: "singleline" | "multiline";
    failureThreshold: number
}

class PlaywrightCI implements Reporter {
    readonly logger: Logger
    readonly utils: IUtility
    readonly info: ITestPlan

    constructor(private options: PlaywrightCIOptions = {
        logType: "singleline",
        failureThreshold: 1
    }
    ) {
        if (typeof options.logType === "undefined") {
            options.logType = "singleline"
        }
        this.logger = LoggerFactory.createLogger(options.logType)
        this.utils = new Utils()
        this.info = new TestPlan()
    }

    onBegin(config: FullConfig, suite: Suite) {
        this.logger.info(`Starting test run with ${this.utils.countUniqueSuites(suite)} suite(s) and ${this.utils.countUniqueTests(suite)} test(s) with ${config.workers} worker(s).`)
    }

    onTestBegin(test: TestCase, result: TestResult) {
        this.logger.test(this.utils.getProjectName(test.parent), `Started: ${test.title}`);
    }

    onTestEnd(test: TestCase, result: TestResult) {
        this.info.Evaluate(result.status, result.retry, test.retries)
        if (result.status === "passed") {
            this.logger.success(this.utils.getProjectName(test.parent), `Completed '${test.title}' within ${this.logger.formatTime(result.duration / 1000)} seconds.`);
        } else if (result.status === "failed") {
            this.logger.error(this.utils.getProjectName(test.parent), `Error in '${test.title}'. Execution time: ${this.logger.formatTime(result.duration / 1000)} seconds. File: ${result.error?.location?.file} ${this.logger.formatError(`(Line ${result.error?.location?.line})`)}`)
        }
    }

    onEnd(result: FullResult) {
        this.logger.info(`Finished test run: ✅ ${this.info.Passed} passed | ❌ ${this.info.Fail} failed | ⏭  ${this.info.Skip} skipped`);

        if (this.info.Fail >= this.options.failureThreshold) {
            process.exit(1)
        } else {
            process.exit(0)
        }
    }

    onStdErr(chunk: string | Buffer, _test: TestCase, _result: TestResult) {
        const text = chunk.toString('utf-8');
        process.stderr.write(text);
    }

    onStdOut(chunk: string | Buffer, _test: TestCase, _result: TestResult) {
        const text = chunk.toString('utf-8');
        process.stdout.write(text);
    }
}

export default PlaywrightCI;
