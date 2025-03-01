import type {
        FullConfig, FullResult, Reporter, Suite, TestCase, TestResult
} from '@playwright/test/reporter';
import LoggerFactory, { ILogger } from "./logging"

class MyReporter implements Reporter {
        readonly logger: ILogger

        constructor() {
                this.logger = LoggerFactory.createLogger("single")
        }

        onBegin(config: FullConfig, suite: Suite) {
                this.logger.info(`Test run with ${suite.allTests().length} tests`)
        }

        onTestBegin(test: TestCase, result: TestResult) {
                console.log(`Starting test ${test.title}`);
        }

        onTestEnd(test: TestCase, result: TestResult) {
                console.log(`Finished test ${test.title}: ${result.status}`);
        }

        onEnd(result: FullResult) {
                console.log(`Finished the run: ${result.status}`);
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

export default MyReporter;
